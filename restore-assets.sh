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

# Generate favicon files from the Israel puzzle logo
if [ -f "$ASSET_SOURCE_DIR/favicon-source.png" ]; then
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
