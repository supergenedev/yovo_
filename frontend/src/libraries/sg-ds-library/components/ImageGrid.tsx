import type { HTMLAttributes } from 'react';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryImageGridCols = '2' | '3' | '4';
export type SgDsLibraryImageGridAspect = '1' | '16/9' | '4/3' | '3/4' | '9/16';
export type SgDsLibraryImageGridTileCount = '1' | '2' | '3' | '4' | '5' | '6';
export type SgDsLibraryImageGridTile = {
  src?: string;
  alt?: string;
  background?: string;
};

export type SgDsLibraryImageGridProps = HTMLAttributes<HTMLDivElement> & {
  cols?: SgDsLibraryImageGridCols;
  aspect?: SgDsLibraryImageGridAspect;
  tileCount?: SgDsLibraryImageGridTileCount;
  imageTile1Src?: string;
  imageTile2Src?: string;
  imageTile3Src?: string;
  imageTile4Src?: string;
  imageTile5Src?: string;
  imageTile6Src?: string;
  imageTile1Alt?: string;
  imageTile2Alt?: string;
  imageTile3Alt?: string;
  imageTile4Alt?: string;
  imageTile5Alt?: string;
  imageTile6Alt?: string;
  tiles?: SgDsLibraryImageGridTile[];
};

const DEFAULT_TILES: SgDsLibraryImageGridTile[] = [
  { background: 'linear-gradient(135deg, #312e81, #be185d)' },
  { background: 'linear-gradient(135deg, #0f766e, #1e3a8a)' },
  { background: 'linear-gradient(135deg, #b45309, #be185d)' },
  { background: 'linear-gradient(135deg, #581c87, #db2777)' },
  { background: 'linear-gradient(135deg, #1f2937, #65a30d)' },
  { background: 'linear-gradient(135deg, #0f172a, #2563eb)' },
];

export function SgDsLibraryImageGrid(rawProps: SgDsLibraryImageGridProps) {
  const {
    aspect = '1',
    className = '',
    cols = '3',
    imageTile1Alt,
    imageTile1Src,
    imageTile2Alt,
    imageTile2Src,
    imageTile3Alt,
    imageTile3Src,
    imageTile4Alt,
    imageTile4Src,
    imageTile5Alt,
    imageTile5Src,
    imageTile6Alt,
    imageTile6Src,
    tileCount = '3',
    tiles,
    ...props
  } = resolveWorkbenchModeProps(rawProps);
  const resolvedTiles = resolveImageGridTiles({
    imageTileAlts: [
      imageTile1Alt,
      imageTile2Alt,
      imageTile3Alt,
      imageTile4Alt,
      imageTile5Alt,
      imageTile6Alt,
    ],
    imageTileSrcs: [
      imageTile1Src,
      imageTile2Src,
      imageTile3Src,
      imageTile4Src,
      imageTile5Src,
      imageTile6Src,
    ],
    tileCount,
    tiles,
  });
  return (
    <div
      {...props}
      className={['sg-ds-library-scope', 'image-grid', className].filter(Boolean).join(' ')}
      data-cols={cols}
      data-count={tileCount}
      data-aspect={aspect === '1' ? undefined : aspect}
    >
      {resolvedTiles.map((tile, index) => (
        <div className="image-grid-tile" key={index} style={tile.background ? { background: tile.background } : undefined}>
          {tile.src ? <img src={tile.src} alt={tile.alt ?? ''} /> : null}
        </div>
      ))}
    </div>
  );
}

function resolveImageGridTiles({
  imageTileAlts,
  imageTileSrcs,
  tileCount,
  tiles,
}: {
  imageTileAlts: Array<string | undefined>;
  imageTileSrcs: Array<string | undefined>;
  tileCount: SgDsLibraryImageGridTileCount;
  tiles?: SgDsLibraryImageGridTile[];
}): SgDsLibraryImageGridTile[] {
  const count = Number.parseInt(tileCount, 10);
  const baseTiles = tiles && tiles.length > 0 ? tiles : DEFAULT_TILES;
  return Array.from({ length: count }, (_, index) => ({
    ...baseTiles[index % baseTiles.length],
    alt: imageTileAlts[index] ?? baseTiles[index % baseTiles.length]?.alt,
    src: imageTileSrcs[index] || baseTiles[index % baseTiles.length]?.src,
  }));
}

export default SgDsLibraryImageGrid;
