export const kGamesFeatures = new Map<number, string[]>([
  // Omega Strikers
  [
    228241,
    [
      'game_info',
      'match_info'
    ]
  ],
]);

export const kGameClassIds = Array.from(kGamesFeatures.keys());

export const kWindowNames = {
  inGame: 'in_game',
  desktop: 'desktop'
};

export const kHotkeys = {
  toggle: 'striker_sets_ts_showhide'
};
