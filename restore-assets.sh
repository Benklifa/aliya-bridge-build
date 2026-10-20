#!/bin/bash

# Script to restore correct asset versions
# This ensures the favicon and Aliya Buddy icon maintain the correct versions

echo "Restoring correct asset versions..."

# Source directory containing the correct versions
ASSET_SOURCE_DIR="$(dirname "$0")/asset-sources"
PUBLIC_DIR="$(dirname "$0")/public"

# Restore Aliya Buddy icon (with "ASK ME ANYTHING" text)
if [ -f "$ASSET_SOURCE_DIR/aliya-buddy-icon-source.png" ]; then
    cp "$ASSET_SOURCE_DIR/aliya-buddy-icon-source.png" "$PUBLIC_DIR/aliya-buddy-icon.png"
    echo "✓ Aliya Buddy icon restored"
else
    echo "✗ Warning: aliya-buddy-icon-source.png not found"
fi

# Favicons: prefer the small, pre-sized files in asset-sources/favicons
# (16x16, 32x32 PNGs and a 16/32/48 .ico, a few KB each). The old fallback
# below copied the full 1.7 MB logo PNG into every favicon slot.
if [ -f "$ASSET_SOURCE_DIR/favicons/favicon.ico" ]; then
    cp "$ASSET_SOURCE_DIR/favicons/favicon.ico" "$PUBLIC_DIR/favicon.ico"
    cp "$ASSET_SOURCE_DIR/favicons/favicon-32x32.png" "$PUBLIC_DIR/favicon-32x32.png"
    cp "$ASSET_SOURCE_DIR/favicons/favicon-16x16.png" "$PUBLIC_DIR/favicon-16x16.png"
    echo "✓ Favicon files restored from asset-sources/favicons"
# Generate favicon files from the Israel puzzle logo
elif [ -f "$ASSET_SOURCE_DIR/favicon-source.png" ]; then
    # Copy as main favicon
    cp "$ASSET_SOURCE_DIR/favicon-source.png" "$PUBLIC_DIR/favicon.ico"
    
    # Generate different sizes using ImageMagick if available
    if command -v convert &> /dev/null; then
        convert "$ASSET_SOURCE_DIR/favicon-source.png" -resize 32x32 "$PUBLIC_DIR/favicon-32x32.png"
        convert "$ASSET_SOURCE_DIR/favicon-source.png" -resize 16x16 "$PUBLIC_DIR/favicon-16x16.png"
        echo "✓ Favicon files generated (32x32, 16x16)"
    else
        # Fallback: just copy the source file
        cp "$ASSET_SOURCE_DIR/favicon-source.png" "$PUBLIC_DIR/favicon-32x32.png"
        cp "$ASSET_SOURCE_DIR/favicon-source.png" "$PUBLIC_DIR/favicon-16x16.png"
        echo "✓ Favicon files copied (ImageMagick not available for resizing)"
    fi
    echo "✓ Favicon restored"
else
    echo "✗ Warning: favicon-source.png not found"
fi

echo "Asset restoration complete!"
