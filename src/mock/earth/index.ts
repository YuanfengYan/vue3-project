/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-12-15 10:16:25
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-24 17:56:31
 */
// @ts-nocheck
import Mock from "../mockchanged.js"

// @ts-ignore
function  allpoivs (level:number){
  // const obj = {
  //   4:Mock.mock({
  //     "type": "FeatureCollection",
  //     "features|1000":[{
  //       "type":"Feature",
  //       "geometry": {
  //         "type": "Point", 
  //         "coordinates": ['@float(-180,180)','@float(-90,90)']
  //       },
  //       "properties": {
  //         "name": "@ctitle(1,5)",
  //         "height|1000-100000": 1,
  //         "level":4,//最低显示层级
  //       }}
  //     ]
  //   }),
  //   5:Mock.mock({
  //     "type": "FeatureCollection",
  //     "features|2000":[{
  //       "type":"Feature",
  //       "geometry": {
  //         "type": "Point", 
  //         "coordinates": ['@float(-180,180)','@float(-90,90)']
  //       },
  //       "properties": {
  //         "name": "@ctitle(1,5)",
  //         "height|1000-100000": 1,
  //         "level":5,//最低显示层级
  //       }}
  //     ]
  //   }),
  //   6:Mock.mock({
  //     "type": "FeatureCollection",
  //     "features|5000":[{
  //       "type":"Feature",
  //       "geometry": {
  //         "type": "Point", 
  //         "coordinates": ['@float(-180,180)','@float(-90,90)']
  //       },
  //       "properties": {
  //         "name": "@ctitle(1,5)",
  //         "height|1000-100000": 1,
  //         "level":5,//最低显示层级
  //       }}
  //     ]
  //   })
  // }
  // // obj
  return Mock.mock({
        "type": "FeatureCollection",
        "features|1000":[{
          "type":"Feature",
          "geometry": {
            "type": "Point", 
            "coordinates": ['@float(-180,180)','@float(-90,90)']
          },
          "properties": {
            "name": "@ctitle(1,5)",
            "height|1000-100000": 1,
            "score|1-100":1.11,
            "level|4-20":1,//最低显示层级
          }}
        ]
      })
  // return Mock.mock({
  //   "array|1-10":[{
  //     position: {
  //     "latitude|-90-90.1-12": 1,
  //     "longitude|-180-180.1-12": 1,
  //     "lat|-90-90.1-12": 1,
  //     "lng|-180-180.1-12": 1,
  //     "height": 0,
  //     "poiv_height|0-12742000": 1,
  //     "level|0-21": 1,
  //     // "minLevel": minLevel, //
  //     // "no_neighborhood_level": item.no_neighborhood_level
  //   },
  //   "id|+1": 1,
  //   "avatar":"@image(250x250,@color,☺)",
  //   "name": '@ctitle(1,5)',
  //   "title": '@ctitle',
  //   // "guide_question": item.guide_question,
  //   // "type": i
    // }]
    
  // })
}
Mock.mock(/\/v1\/earth\/allpoivs/, 'get', allpoivs)

interface point{
  longitude: number,
  latitude: number,
  height?: number,
}
Mock.mock(/\/v1\/earth\/poivpath/, 'post', function (data:any):{list:point[]} {
  const params:any = JSON.parse(data.body)
  // const arr = new Array(params.count).fill('')
  // arr.map(item=>{
  //   item = Mock.mock({
  //     'longitude': '@float(-180,180)',
  //     'latitude': '@float(-180,180)',
  //     'height|1-10000': 1,
  //   })
  // })
  // console.log('arr',arr)

  return Mock.mock({
  [`list|${params.count}`]:[{
    'longitude': '@float(0,90)',
    'latitude': '@float(-30,30)',
    'height|1-10000': 1,
  }]})
})
