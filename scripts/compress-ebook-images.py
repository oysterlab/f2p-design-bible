#!/usr/bin/env python3
"""Compress staged manuscript images for publication.

Screenshots and charts are re-encoded to JPEG when they carry no real
transparency, which is the bulk of the saving. Images that actually use their
alpha channel stay PNG and are only downscaled. Animated GIFs are left alone.

Renamed files are reported so the manuscript references can be rewritten.
"""
import json
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMAGE_ROOT = ROOT / "public" / "images"
COLLECTIONS = ("bible", "dof", "gameanalytics")
MAX_WIDTH = 1200
JPEG_QUALITY = 78
# Below this, re-encoding saves little and risks visible artefacts.
MIN_BYTES = 120_000


def uses_alpha(image: Image.Image) -> bool:
    if image.mode not in ("RGBA", "LA", "PA"):
        return "transparency" in image.info
    alpha = image.convert("RGBA").getchannel("A")
    low, _ = alpha.getextrema()
    return low < 250


def main() -> int:
    renames: dict[str, str] = {}
    before = after = 0
    converted = downscaled = skipped = 0

    for collection in COLLECTIONS:
        for path in sorted((IMAGE_ROOT / collection).rglob("*")):
            if not path.is_file():
                continue
            size = path.stat().st_size
            before += size

            if path.suffix.lower() == ".gif":
                after += size
                continue

            try:
                with Image.open(path) as image:
                    image.load()
                    wide = image.width > MAX_WIDTH
                    if size < MIN_BYTES and not wide:
                        after += size
                        skipped += 1
                        continue

                    if wide:
                        height = round(image.height * MAX_WIDTH / image.width)
                        image = image.resize((MAX_WIDTH, height), Image.LANCZOS)

                    if uses_alpha(image):
                        image.save(path, optimize=True)
                        downscaled += 1
                        target = path
                    else:
                        target = path.with_suffix(".jpg")
                        image.convert("RGB").save(
                            target, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True
                        )
                        if target != path:
                            path.unlink()
                            renames[
                                str(path.relative_to(IMAGE_ROOT.parent))
                            ] = str(target.relative_to(IMAGE_ROOT.parent))
                        converted += 1
            except Exception as error:  # noqa: BLE001 - report and keep the original
                print(f"  ! {path.relative_to(IMAGE_ROOT)}: {error}", file=sys.stderr)
                after += size
                skipped += 1
                continue

            after += target.stat().st_size

    (ROOT / "extracted" / "renames.json").write_text(
        json.dumps(renames, indent=2, ensure_ascii=False) + "\n", encoding="utf8"
    )
    print(
        f"converted {converted} to JPEG, downscaled {downscaled} PNG, skipped {skipped}\n"
        f"{before / 1e6:.0f}MB -> {after / 1e6:.0f}MB ({len(renames)} renamed)"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
