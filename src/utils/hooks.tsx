import * as React from 'react';
import { Color, ColorProps } from 'components';
import Worker from 'worker';
import { consts, getStorage } from 'utils';

export function useLoadColors(numOfOptions: number) {
  const [renderedImage, setRenderedImage] = React.useState<JSX.Element[]>([
    <div key={1}>Loading...</div>
  ]);
  const instance = React.useMemo(() => new Worker(), []);

  React.useEffect(() => {
    const imageArr: JSX.Element[] = [];
    const keys: string[] = [];
    const runAsync = async () => {
      let top = 0;
      let left = -1;
      const db = await getStorage();
      await db.clear();
      for (let index = 0; index < numOfOptions; index++) {
        // sync calculate a unique color for the image
        const { key, color } = await instance.processWebWorker(keys);
        if (left === consts.IMAGE_WIDTH) {
          top++;
          left = -1;
        }
        left = Math.min(left + 1, consts.IMAGE_WIDTH);
        keys.push(key);
        await db.putValue({
          ...color,
          left,
          top
        });
      }
      const data: ColorProps[] = await db.getAllValues();
      data.map(item => {
        imageArr.push(<Color key={`${item.r}_${item.g}_${item.b}`} {...item} />);
      });
      setRenderedImage(imageArr);
    };
    runAsync();
  }, [numOfOptions, instance]);

  return renderedImage;
}
