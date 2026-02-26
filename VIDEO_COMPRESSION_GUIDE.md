# Video Compression Guide for Hero Section

## Current Optimizations Added ✅

I've already optimized the video element with:
- **preload="metadata"** - Only loads video metadata initially, not the entire file
- **Hardware acceleration** - Added `transform: translateZ(0)` and `willChange: 'transform'`
- **Lazy loading behavior** - Video starts loading when needed
- **Mobile optimized** - `playsInline` ensures smooth playback on iOS

## Option 1: Online Video Compression (Easiest)

Use one of these free online tools:
1. **CloudConvert** - https://cloudconvert.com/mp4-converter
   - Upload your video
   - Set quality to 50-70%
   - Choose H.264 codec
   - Download compressed version

2. **FreeConvert** - https://www.freeconvert.com/video-compressor
   - Upload video
   - Select "High compression"
   - Download result

3. **Clideo** - https://clideo.com/compress-video
   - Drag and drop video
   - Auto-compress
   - Download

## Option 2: Install FFmpeg (Recommended for Best Results)

### Install FFmpeg on Windows:
```powershell
# Using Chocolatey (install Chocolatey first from https://chocolatey.org)
choco install ffmpeg

# OR download directly from https://ffmpeg.org/download.html
```

### Compress Video Command:
Once FFmpeg is installed, run this in your terminal:
```bash
ffmpeg -i "public\hero-video.mp4" -vcodec h264 -crf 28 -preset medium -vf "scale=1920:-2" -an "public\hero-video-compressed.mp4"
```

Then replace the file:
```bash
Move-Item -Path "public\hero-video-compressed.mp4" -Destination "public\hero-video.mp4" -Force
```

### Compression Settings Explained:
- `-crf 28` - Quality (18-28 is good, higher = smaller file)
- `-preset medium` - Encoding speed vs compression
- `-vf "scale=1920:-2"` - Resize to 1920px width (maintains aspect ratio)
- `-an` - Remove audio (not needed for background video)

## Option 3: Use WebM Format (Better Compression)

If you want even better compression, convert to WebM:
```bash
ffmpeg -i "public\hero-video.mp4" -c:v libvpx-vp9 -crf 30 -b:v 0 "public\hero-video.webm"
```

Then update the video source in the component to use both formats:
```tsx
<video ...>
  <source src="/hero-video.webm" type="video/webm" />
  <source src="/hero-video.mp4" type="video/mp4" />
</video>
```

## Recommended Steps:

1. **Quick fix**: Use CloudConvert to compress now (Option 1)
2. **Long-term**: Install FFmpeg for future video work (Option 2)
3. **Optimal**: Convert to WebM for best compression (Option 3)

## Target File Sizes:
- For full-width hero: Aim for under 5MB
- For mobile: Ideally under 2-3MB
- Current optimizations will help regardless of file size
