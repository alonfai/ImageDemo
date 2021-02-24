import * as React from 'react';
import { consts, hooks, Interfaces } from 'utils';
import { Grid } from 'components';
import { ITEM_INTESITY } from 'processData';

type ResultType = Interfaces.Color & Interfaces.Position;

function App() {
  /**
   * Get the number of color options to choose from based on maximum available or given input param (can't be more then possible cases of 256*256*256 = 16,777,216 / 16Million unique colors available)
   */
  const numOfOptions = Math.min(
    consts.IMAGE_HEIGHT * consts.IMAGE_WIDTH,
    ITEM_INTESITY * ITEM_INTESITY * ITEM_INTESITY
  );
  const renderedImage = hooks.useLoadColors(numOfOptions);

  return <Grid>{renderedImage}</Grid>;
}

export default App;
