import yapi from '../yapi.js'
import baseModel from './base.js'

class interfaceModel extends baseModel{
    getName(){
        return 'interface'
    }

    getSchema(){
        return {
            uid: {type: Number, required: true},
            path: {type: String, required: true, validate: {
                validator: (v) => {
                    return v && v[0] !== '/';
                },
                message: '接口路径第一位不能是/'
            }},
            method: {type: String, required: true},
            project_id: {type: Number, required: true},
            desc: String,
            add_time: Number,
            up_time: Number,
            req_headers: [{
                name: String, value: String,  desc: String, required: Boolean
            }],
            req_params_type: {
                type: String,
                enum: ["form", "json", "text", "xml"]
            },
            req_params_form: [{
                name: String, value: String,value_type: {type: String, enum: ["text", "file"]}, desc: String, required: Boolean
            }],
            req_params_other: String,
            res_body_type: {
                type: String,
                enum: ["json", "text", "xml"]
            },
            res_body: String
        }
    }

    save(data) {
        let m = new this.model(data);
        return m.save();
    }


    get(id){
        return this.model.findOne({
            _id: id
        }).exec()
    }

    getByPath(project_id, path){
        return this.model.find({
            project_id: project_id,
            path: path
        }).exec()
    }

    checkRepeat(path, method){
        return this.model.count({
            path: path,
            method: method
        })
    }

    countByProjectId(id){
        return this.model.count({
            project_id: id
        })
    }

    list (group_id){
        return this.model.find({
            group_id: group_id
        }).exec()
    }

    del(id){
        return this.model.deleteOne({
            _id: id
        })
    }
    up(id, data){
        data.up_time = yapi.commons.time();
        return this.model.update({
            _id: id,
        }, data, { runValidators: true })
    }
}

module.exports = interfaceModel;