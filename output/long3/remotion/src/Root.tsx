import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = ["the-fall","started-29th","forty-three-to-go","lap-457-sequence","the-hit","on-purpose","blaney-quotes","atlanta-history","ten-minutes-before","the-punches","pulled-apart","the-crowd","blaneys-side","hocevar-not-on-purpose","hocevar-quotes","who-was-right","damage-in-points","format-twist","still-hurt","points-gap","hocevar-third","st-louis-brakes","logano-wins","where-this-leaves-him","the-math","bring-it-together","your-take","subscribe"];

export const RemotionRoot: FC = () => (
  <>
    <Composition id="final-film" component={FinalFilm} width={1920} height={1080} fps={30} durationInFrames={TOTAL_FRAMES} />
    {SCENES.map((Comp, i) => (
      <Composition key={KEBAB[i]} id={KEBAB[i]} component={Comp} width={1920} height={1080} fps={30} durationInFrames={sceneFrames(i + 1)} />
    ))}
  </>
);
