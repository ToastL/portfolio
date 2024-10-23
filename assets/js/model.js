import * as THREE from 'three'
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { MtlObjBridge } from 'three/examples/jsm/loaders/obj2/bridge/MtlObjBridge'

export default class Model {
    constructor(filename) {
        this.filename = filename
        this.materials = null
        this.root = null
    }

    async loadMaterial() {
        return new Promise(resolve => {
            const mtlLoader = new MTLLoader()
            mtlLoader.load(`/models/${this.filename}.mtl`, mtlParseResult => {
                this.materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult)
                resolve()
            })
        })
    }

    async loadObject() {
        return new Promise(resolve => {
            const objLoader = new OBJLoader2()
            objLoader.addMaterials(this.materials, true)
            objLoader.load(`/models/${this.filename}.obj`, root => {
                this.root = root
                resolve()
            })
        })
    }

    getObject() {
        return this.root
    }

    static async load(filename) {
        const model = new Model(filename)
        await model.loadMaterial()
        await model.loadObject()
        return model
    }
}