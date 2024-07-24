
const MAX_ZOOM_LEVEL = 9;
export const heatmapLayer ={
    'type': 'heatmap',
    'source': "propertyInfo",
    'paint': {
              // increase weight as diameter breast height increases
              'heatmap-weight': {
                'property': 'pricePerUnit',
                'type': 'exponential',
                'stops': [
                  [1, 0],
                  [43500, 1]
                ]
              },
              // increase intensity as zoom level increases
              'heatmap-intensity': {
                'stops': [
                  [11, 1],
                  [15, 3]
                ]
              },
              // use sequential color palette to use exponentially as the weight increases
              'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(236,222,239,0)',
                0.2,
                'rgb(208,209,230)',
                0.4,
                'rgb(166,189,219)',
                0.6,
                'rgb(103,169,207)',
                0.8,
                'rgb(28,144,153)'
              ],
              // increase radius as zoom increases
              'heatmap-radius': {
                'stops': [
                  [11, 15],
                  [15, 20]
                ]
              },
              // decrease opacity to transition into the circle layer
              'heatmap-opacity': {
                'default': 1,
                'stops': [
                  [14, 1],
                  [15, 0]
                ]
              }
            }
   };