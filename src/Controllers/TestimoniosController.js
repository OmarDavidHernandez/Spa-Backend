import {conexion} from '../db.js';

export const getTestimonios = async (req,res) => {
    try{
        const {id} = req.params;
        var where = (id === undefined) ? '' : 'WHERE id ="'+id+'" ';
        const [rows] = await conexion.query('SELECT * FROM testimonios '+where);
        return res.json({status:true,data:rows});
    }
    catch(error){
        return res.status(500).json({message:'error'});
    }
};

export const saveTestimonios = async(req,res) => {
    try {
        const {descripcion,cliente} = req.body;
        var validacion = validar(descripcion,cliente);
        if(Object.entries(validacion).length === 0){
            await conexion.query(
            'INSERT INTO testimonios(descripcion,cliente) VALUES (?,?)',
            [descripcion,cliente]);
            return res.status(200).json({status:true,message:'Testimonio guardado'});
        }
        else{
            return res.status(400).json({status:false,errors:validacion});
        }
    }
    catch (error) {
        return res.status(500).json({status:false,errors:[error.message]});
    }
};

export const updateTestimonios = async(req,res) => {
    try {
        const {id} = req.params;
        const {descripcion,cliente} = req.body;
        var validacion = validar(descripcion,cliente);
        if(Object.entries(validacion).length === 0){
            const [result] = await conexion.query(
            'UPDATE testimonios SET descripcion = ? , cliente = ?  WHERE id = ?',
            [descripcion,cliente,id]);
            if(result.affectedRows === 0){
                return res.status(404).json({status:'error',errors:[{id:'No existe el ID'}]});
            }
            return res.status(200).json({status:true,message:'Testimonio modificado'});
        }
        else{
            return res.status(400).json({status:false,errors:validacion});
        }
    }
    catch (error) {
        return res.status(500).json({status:false,errors:[error.message]});
    }
};

export const deleteTestimonios = async(req,res) => {
    try {
        const {id} = req.params;
        const [result] = await conexion.query('DELETE FROM testimonios WHERE id = ?',[id]);
        if(result.affectedRows === 0){
            return res.status(404).json({status:'error',errors:[{id:'No existe el ID'}]});
        }
        return res.status(200).json({status:true,message:'Testimonio eliminado'});
    }
    catch (error) {
        return res.status(500).json({status:false,errors:[error.message]});
    }
};

function validar(descripcion,cliente){
    var errors =[];
    if(cliente === undefined || cliente.trim() === '' || cliente.lenght > 100){
        errors.push(
            'El nombre del cliente NO debe estar vacío y debe tener máximo 100 caracteres.'
        );
    }
    if(descripcion === undefined || descripcion.trim() === ''){
        errors.push(
            'La descripción del testimonio NO debe de estar vacía.'
        );
    }
    return errors;
}