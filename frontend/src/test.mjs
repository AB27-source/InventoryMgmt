import('./utils.mjs').then(({ calculateBookCount, calculateVariance }) => {
    const bookCount = calculateBookCount(1696, 0, 120, 0, 39);
    console.log('Book Count:', bookCount);
    
    const endCount = 1778;
    const variance = calculateVariance(endCount, bookCount);
    console.log('Variance:', variance);
  });