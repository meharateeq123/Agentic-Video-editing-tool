import React from 'react';
import {BedChain} from '../components/BedChain';
import {type Win} from '../components/Bed';
import {IdCard} from '../components/IdCard';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S16_DUR = mountedFrames(16);

/**
 * Scene 16
 * The competitive field she is walking back into has also changed since she last raced internationally.
 * Her own South African teammate, Lara van Niekerk, has been closing in on the world's best 50
 * breaststroke times, and swimmers like Meilutyte, Italy's Anita Bottazzo, and Germany's Anna Elendt have
 * all pushed the global standard down ... The field is deeper and faster than it was even a few years ago.
 *
 * Two name cards on the named rivals: van Niekerk on "Lara" (7.0s = frame 210) and Elendt on "Anna"
 * (14.8s = frame 444). Meilutyte already had hers in scene 10; Bottazzo's own walk-out (with the
 * broadcast's name lower-third) is in the footage instead of a card.
 */
const LARA_W: Win = [204, 236, 290, 316];
const ANNA_W: Win = [438, 470, 524, 550];

export const Scene16: React.FC = () => (
  <BedChain segs={chain(16)} dur={S16_DUR} wins={[LARA_W, ANNA_W]} amp={0.04} maxBlur={7} dim={0.22}>
    <IdCard
      photo="id/vanniekerk.png"
      name="Lara van Niekerk"
      affiliation="South Africa · 50m breaststroke"
      focus={[52, 30]}
      zoom={1.15}
      win={LARA_W}
    />
    <IdCard
      photo="id/elendt.jpg"
      name="Anna Elendt"
      affiliation="Germany · breaststroke"
      focus={[50, 45]}
      zoom={1.0}
      win={ANNA_W}
    />
  </BedChain>
);
