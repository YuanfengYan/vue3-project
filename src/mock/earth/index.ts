/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-12-15 10:16:25
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-15 19:21:36
 */
// @ts-nocheck
import Mock from "../mockchanged.js"

// @ts-ignore
function  allpoivs (){
  return Mock.mock({
    "type": "FeatureCollection",
    "features|100":[{
      "type":"Feature",
      "geometry": {
        "type": "Point", 
        "coordinates": ['@float(-180,180)','@float(-90,90)']
      },
      "properties": {
        "name": "@ctitle(1,5)",
        "height|10000-100000": 1
      }}
    ]
  })
  return Mock.mock({
    "array|1-10":[{
      position: {
      "latitude|-90-90.1-12": 1,
      "longitude|-180-180.1-12": 1,
      "lat|-90-90.1-12": 1,
      "lng|-180-180.1-12": 1,
      "height": 0,
      "poiv_height|0-12742000": 1,
      "level|0-21": 1,
      // "minLevel": minLevel, //提前一个层级显示
      // "no_neighborhood_level": item.no_neighborhood_level
    },
    "id|+1": 1,
    "avatar":"@image(250x250,@color,☺)",
    "name": '@ctitle(1,5)',
    "title": '@ctitle',
    // "guide_question": item.guide_question,
    // "type": i
    }]
    
  })
}
Mock.mock(/\/v1\/earth\/allpoivs/, 'get', allpoivs)