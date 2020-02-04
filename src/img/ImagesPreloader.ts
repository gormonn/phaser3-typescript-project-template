import {get} from 'lodash';
import { Guid } from 'guid-typescript';
import config from './config';
import IMAGES_OBJECT from './images';
import IMAGES_FLAT from './images.flat';
import { IMG_TYPE_IMAGE, IMG_TYPE_SPRITESHEET } from '../const'

// const uid = key => (key + '_' + Math.random().toString(36).substr(2, 9));
class ImagesPreloader {
    loadContext: Phaser.Loader.LoaderPlugin;
    filter?: string | Array<any>;
    fileType?: string;
    fileConf?: any;
    lastKeyValue?: string;
    readonly mapKeyValues = new Map();
    constructor(context: Phaser.Loader.LoaderPlugin, filter?: string | Array<any>, fileType = IMG_TYPE_IMAGE, fileConf = {}){
        this.loadContext = context;
        this.filter = filter;
        this.fileType = fileType;
        this.fileConf = fileConf;
    }
    filterObjectIterator(filter: Object){
        for (let key in filter) {
            let value = filter[key];
            if(value instanceof Object){
                this.filterObjectIterator(value);
            }else{
                this.preloadImageByFilter(value);
            }
        }
    }
    preload() {
        const { filter } = this;
        if(filter){
            if(filter instanceof Array){
                filter.forEach(item => {
                    if(item instanceof Object){
                        this.filterObjectIterator(item);
                    }else{
                        this.preloadImageByFilter(item);
                    }
                })
            }
            if(typeof filter === 'string'){
                this.preloadImageByFilter(filter);
            }
        }else{
            IMAGES_FLAT.VALUES.forEach((value, i) => {
                const key = get(IMAGES_OBJECT, IMAGES_FLAT.KEYS[i]);
                this.preloadImage(key, value);
            })
        }
    }
    preloadImageByFilter (filter: string)  {
        this.preloadImage(filter, filter);
    }
    // preloadImage(key: string, value: string) {
    preloadImage(key:string, value: string) {
        // // const key = Guid.create();
        // // const uKey = uid(key);
        // const uKey = key;
        // this.mapKeyValues.set(value, uKey);
        // this.lastKeyValue = uKey;
        const { fileType, fileConf } = this;
        switch(fileType){
            case IMG_TYPE_IMAGE:
                this.loadContext.image(key, `${config.basePath}${value}`);
            break;
            case IMG_TYPE_SPRITESHEET:
                this.loadContext.spritesheet(key, `${config.basePath}${value}`, fileConf);
            break;
        }
    }
    // get lastKey(){
    //     return this.lastKeyValue;
    // }
    // get keyValues(){
    //     return this.mapKeyValues;
    // }
    // getImageKey(value: string){
    //     return this.mapKeyValues.get(value);
    // }
}
export default ImagesPreloader;