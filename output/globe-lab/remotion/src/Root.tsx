import type {FC} from 'react';
import {Composition} from 'remotion';
import {RealisticGlobe, type GlobePlace} from './components/RealisticGlobe';

/**
 * globe-lab is a standalone workbench for the realistic Earth component — it is not a film. Each
 * composition is one shot, so a video can preview exactly the move it is about to use before any
 * of it is wired into that video's own project.
 *
 * Two kinds of target:
 *   - a country name, which flies down to that country and holds it gold-highlighted, or
 *   - a place ({name, lat, lon}), which flies all the way down onto the exact spot the narration
 *     names and drops a pinging marker on it.
 *
 * Adding a new country highlight: run
 *   cd D:\flick\assets\globe-builder && node build.mjs highlight "<Country Name>"
 * then copy the PNG it prints into public/globe/highlights/.
 *
 * Adding a new place needs no build step at all — just its latitude and longitude.
 */
const DUR = 300; // 10s at 30fps

const USA = 'United States of America';

const TRACKS: Record<string, GlobePlace> = {
  talladega: {name: 'Talladega', lat: 33.5686, lon: -86.0661, sub: 'Superspeedway', country: USA},
  daytona: {name: 'Daytona', lat: 29.1852, lon: -81.07, sub: 'International Speedway', country: USA},
  rockingham: {name: 'Rockingham', lat: 34.9707, lon: -79.4744, sub: 'Speedway', country: USA},
  charlotte: {name: 'Charlotte', lat: 35.351, lon: -80.6828, sub: 'Motor Speedway', country: USA},
};

const CountryShot: FC = () => <RealisticGlobe target={USA} dur={DUR} />;

export const RemotionRoot: FC = () => (
  <>
    <Composition
      id="globe-usa"
      component={CountryShot}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={DUR}
    />
    {Object.entries(TRACKS).map(([id, place]) => (
      <Composition
        key={id}
        id={`globe-${id}`}
        component={() => <RealisticGlobe target={place} dur={DUR} />}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={DUR}
      />
    ))}
    {/* Speed follows the voiceover: the same shot at the lengths a real narration line runs, so
        the pacing can be checked against a short line and a long one, not just the 10s default. */}
    {[
      {id: 'vo-short-4s', frames: 120},
      {id: 'vo-6s', frames: 180},
      {id: 'vo-long-20s', frames: 600},
    ].map(({id, frames}) => (
      <Composition
        key={id}
        id={`globe-${id}`}
        component={() => <RealisticGlobe target={TRACKS.talladega} dur={frames} />}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={frames}
      />
    ))}
  </>
);
