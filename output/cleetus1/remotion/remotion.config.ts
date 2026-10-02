import {Config} from '@remotion/cli/config';

// Render on the GTX 1650 rather than the CPU. On Windows, "angle" routes Chromium's WebGL and
// canvas work through D3D11 onto the discrete GPU; the default renderer falls back to software
// rasterisation, which is what makes a 1080p render crawl on the CPU.
Config.setChromiumOpenGlRenderer('angle');

// Frame rendering is where the GPU actually helps here, and the line above puts it there.
// Encoding is a separate stage, and "if-possible" did NOT degrade gracefully on this box: every
// frame rendered, then the stitch died with "FFmpeg quit with code 4294967256" (-40) because the
// hardware h264 encoder it picks up on Windows can't take this input. Software encode is the
// working path; the GPU keeps doing the rasterising.
Config.setHardwareAcceleration('disable');

Config.setVideoImageFormat('jpeg');
Config.setCodec('h264');
Config.setOverwriteOutput(true);
