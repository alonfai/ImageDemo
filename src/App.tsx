import * as React from 'react';
import { consts, Interfaces } from 'utils';
import { Color, Grid } from 'components';
import Worker from './worker';
import { ITEM_INTESITY } from 'processData';

function App() {
  const [renderedImage, setRenderedImage] = React.useState<JSX.Element[]>([
    <div key={1}>Loading...</div>
  ]);

  /**
   * Get the number of color options to choose from based on maximum available or given input param (can't be more then possible cases of 256*256*256 = 16,777,216 / 16Million unique colors available)
   */

  const instance = React.useMemo(() => new Worker(), []);

  const numOfOptions = Math.min(
    consts.IMAGE_HEIGHT * consts.IMAGE_WIDTH,
    ITEM_INTESITY * ITEM_INTESITY * ITEM_INTESITY
  );
  React.useEffect(() => {
    // Create new instance
    const data = new Map<string, Interfaces.Color>();
    const imageArr: JSX.Element[] = [];
    // Create new instance
    const runAsync = async () => {
      let top = 0;
      let left = -1;
      for (let index = 0; index < numOfOptions; index++) {
        // sync calculate a unique color for the image
        const { key, color } = await instance.processWebWorker(Array.from(data.keys()));
        data.set(key, color);
        if (left === consts.IMAGE_WIDTH) {
          top++;
          left = -1;
        }
        left = Math.min(left + 1, consts.IMAGE_WIDTH);
        imageArr.push(<Color key={key} {...color} left={left} top={top} />);
      }
      setRenderedImage(imageArr);
    };

    runAsync();

    // return function cleanup() {
    //   instance.terminate();
    // };
  }, [numOfOptions, instance]);

  // // render the image inside the main Grid component
  return <Grid>{renderedImage}</Grid>;
}

export default App;
