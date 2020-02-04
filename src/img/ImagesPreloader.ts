import {get} from 'lodash';
import config from './config';
import IMAGES_OBJECT from './images';
import IMAGES_FLAT from './images.flat';

class ImagesPreloader {
    loadContext: Phaser.Loader.LoaderPlugin;
    filter?: string | Array<any>;
    fileType?: string;
    fileConf?: any;
    lastKeyValue?: string;
    constructor(context: Phaser.Loader.LoaderPlugin, filter?: string | Array<any>, fileType = 'image', fileConf = {}){
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
    preloadImage(key: string, value: string) {
        this.lastKeyValue = key;
        const { fileType, fileConf } = this;
        switch(fileType){
            case 'image':
                this.loadContext.image(key, `${config.basePath}${value}`);
            break;
            case 'spritesheet':
                this.loadContext.spritesheet(key, `${config.basePath}${value}`, fileConf);
            break;
        }
    }
    get lastKey(){
        return this.lastKeyValue;
    }
}
export default ImagesPreloader;