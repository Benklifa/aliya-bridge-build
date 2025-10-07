# Asset Management Guide

## Overview

This document explains how to maintain the correct versions of critical assets (favicon and Aliya Buddy icon) throughout the build and deployment process.

## Problem

During the build process, some assets were being overwritten with older versions, specifically:
- **Favicon**: Reverting to the Lovable logo instead of the Israel puzzle logo
- **Aliya Buddy Icon**: Reverting to a version without the "ASK ME ANYTHING" text

## Solution

A permanent asset restoration system has been implemented:

### 1. Asset Sources Directory

The `asset-sources/` directory contains the authoritative versions of critical assets:
- `favicon-source.png` - Israel puzzle logo (blue version)
- `aliya-buddy-icon-source.png` - Aliya Buddy icon with "ASK ME ANYTHING" text

**Important**: These files should NEVER be modified unless you're intentionally updating the assets.

### 2. Restore Script

The `restore-assets.sh` script automatically:
- Copies the correct Aliya Buddy icon to `public/aliya-buddy-icon.png`
- Generates favicon files in multiple sizes (favicon.ico, favicon-32x32.png, favicon-16x16.png)
- Runs automatically before each build via the `prebuild` npm script

### 3. Build Integration

The package.json includes a `prebuild` script that runs `restore-assets.sh` before every build:

```json
"scripts": {
  "prebuild": "./restore-assets.sh",
  "build": "vite build"
}
```

This ensures that every build uses the correct asset versions.

## Usage

### Normal Build Process

Simply run the standard build command:

```bash
npm run build
```

The `prebuild` script will automatically restore the correct assets before building.

### Manual Asset Restoration

If you need to restore assets manually without building:

```bash
./restore-assets.sh
```

### Updating Assets

To update the favicon or Aliya Buddy icon:

1. Place the new version in the `asset-sources/` directory
2. Name it appropriately:
   - `favicon-source.png` for the favicon
   - `aliya-buddy-icon-source.png` for the Aliya Buddy icon
3. Run `./restore-assets.sh` to apply the changes
4. Commit both the source file and the generated public files

## Verification

After building, verify that the correct assets are in place:

```bash
ls -lh public/favicon*.* public/aliya-buddy-icon.png
```

All files should have recent timestamps matching the build time.

## Deployment

When deploying to Vercel or other platforms:

1. Ensure the `asset-sources/` directory is included in the repository
2. Ensure `restore-assets.sh` is executable (git should preserve this)
3. The build process will automatically run the restoration script

## Troubleshooting

### Assets still reverting after build

1. Check that `restore-assets.sh` is executable:
   ```bash
   chmod +x restore-assets.sh
   ```

2. Verify the source files exist:
   ```bash
   ls -lh asset-sources/
   ```

3. Run the script manually and check for errors:
   ```bash
   ./restore-assets.sh
   ```

### Script not running during build

1. Verify the `prebuild` script is in package.json
2. Check that npm is running the prebuild hook (check build logs)
3. On deployment platforms, ensure shell scripts are allowed to execute

## Files Involved

- `asset-sources/favicon-source.png` - Source favicon image
- `asset-sources/aliya-buddy-icon-source.png` - Source Aliya Buddy icon
- `restore-assets.sh` - Asset restoration script
- `package.json` - Contains the prebuild hook
- `public/favicon.ico` - Generated favicon (main)
- `public/favicon-32x32.png` - Generated favicon (32x32)
- `public/favicon-16x16.png` - Generated favicon (16x16)
- `public/aliya-buddy-icon.png` - Aliya Buddy chat widget icon
