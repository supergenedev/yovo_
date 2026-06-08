<script setup>
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()

const props = defineProps({
  cols: { default: '3' },
  aspect: { default: '1' },
  tileCount: { default: '3' },
  imageTile1Src: { default: undefined },
  imageTile2Src: { default: undefined },
  imageTile3Src: { default: undefined },
  imageTile4Src: { default: undefined },
  imageTile5Src: { default: undefined },
  imageTile6Src: { default: undefined },
  imageTile1Alt: { default: undefined },
  imageTile2Alt: { default: undefined },
  imageTile3Alt: { default: undefined },
  imageTile4Alt: { default: undefined },
  imageTile5Alt: { default: undefined },
  imageTile6Alt: { default: undefined },
  tiles: { default: undefined },
})

const DEFAULT_TILES = [
  { background: 'linear-gradient(135deg, #312e81, #be185d)' },
  { background: 'linear-gradient(135deg, #0f766e, #1e3a8a)' },
  { background: 'linear-gradient(135deg, #b45309, #be185d)' },
  { background: 'linear-gradient(135deg, #581c87, #db2777)' },
  { background: 'linear-gradient(135deg, #1f2937, #65a30d)' },
  { background: 'linear-gradient(135deg, #0f172a, #2563eb)' },
]

function resolveImageGridTiles({ imageTileAlts, imageTileSrcs, tileCount, tiles }) {
  const count = Number.parseInt(tileCount, 10)
  const baseTiles = tiles && tiles.length > 0 ? tiles : DEFAULT_TILES
  return Array.from({ length: count }, (_, index) => ({
    ...baseTiles[index % baseTiles.length],
    alt: imageTileAlts[index] ?? baseTiles[index % baseTiles.length]?.alt,
    src: imageTileSrcs[index] || baseTiles[index % baseTiles.length]?.src,
  }))
}

const resolvedTiles = computed(() =>
  resolveImageGridTiles({
    imageTileAlts: [
      props.imageTile1Alt,
      props.imageTile2Alt,
      props.imageTile3Alt,
      props.imageTile4Alt,
      props.imageTile5Alt,
      props.imageTile6Alt,
    ],
    imageTileSrcs: [
      props.imageTile1Src,
      props.imageTile2Src,
      props.imageTile3Src,
      props.imageTile4Src,
      props.imageTile5Src,
      props.imageTile6Src,
    ],
    tileCount: props.tileCount,
    tiles: props.tiles,
  })
)

const classes = computed(() =>
  ['sg-ds-library-scope', 'image-grid', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :data-cols="props.cols"
    :data-count="props.tileCount"
    :data-aspect="props.aspect !== '1' ? props.aspect : undefined"
  >
    <div
      v-for="(tile, index) in resolvedTiles"
      :key="index"
      class="image-grid-tile"
      :style="tile.background ? { background: tile.background } : undefined"
    >
      <img v-if="tile.src" :src="tile.src" :alt="tile.alt ?? ''" />
    </div>
  </div>
</template>
