import {conexion} from '../db.js';
import {EMAIL_HOST,EMAIL_USER,EMAIL_PASS,EMAIL_PORT,EMAIL_TYPE} from '../config.js';
import * as nodemailer from 'nodemailer';

export const getReservaciones = async (req,res) => {
    try{
        const {id} = req.params;
        var where = (id === undefined) ? '' : 'WHERE r.id ="'+id+'" ';
        const [rows] = await conexion.query('SELECT r.*, s.nombre as servicio,date_format(fecha, "%d/%m/%Y") as cita,date_format(fecha, "%Y-%m-%d") as fecha2 FROM reservaciones r INNER JOIN servicios s ON r.servicio_id = s.id  '+where);
        return res.json({status:true,data:rows});
    }
    catch(error){
        return res.status(500).json({message:'error'});
    }
};
export const saveReservaciones = async(req,res) => {
    try {
        const {nombre,telefono,correo,servicio,fecha,hora} = req.body;
        var validacion = validar(nombre,telefono,correo,servicio,fecha,hora);
        if(Object.entries(validacion).length === 0){
            const asunto = 'Reservación en SPA Relaxín';
            const texto = '<h3>Estimado(a): <b>'+nombre+'</b> </h3><p>Es un placer recibir tu solicitud de Reservación para el día <b>'+fecha+'</b> a las <b>'+hora+'</b> , en breve nos comunicaremos contigo para confirmar tu reservación al número <b>'+telefono+'</b> </p><p><h3>En SPA Relaxin ¡estamos felices de concentirte!</h3></p>';
            await enviarCorreo(correo,asunto,texto);
            await conexion.query(
            'INSERT INTO reservaciones(nombre,telefono,correo,servicio_id,fecha,hora) VALUES (?,?,?,?,?,?)',
            [nombre,telefono,correo,servicio,fecha,hora]);
            return res.status(200).json({status:true,message:'Se ha reservado su cita, en breve le contactaremos'});
        }
        else{
            return res.status(400).json({status:false,errors:validacion});
        }
    }
    catch (error) {
        return res.status(500).json({status:false,errors:[error.message]});
    }
};

export const updateReservaciones = async(req,res) => {
    try {
        const {id} = req.params;
        const {nombre,telefono,correo,servicio,fecha,hora} = req.body;
        var validacion = validar(nombre,telefono,correo,(''+servicio+''),fecha,hora);
        if(Object.entries(validacion).length === 0){
            const asunto = 'Modificación en su reservación de SPA Relaxín';
            const texto = '<h3>Estimado(a): <b>'+nombre+'</b> </h3><p>Hemos reagendado tu solicitud de Reservación para el día <b>'+fecha+'</b> a las <b>'+hora+'</b> , en breve nos comunicaremos contigo para confirmar tu reservación al número <b>'+telefono+'</b> </p><p><h3>En SPA Relaxin ¡estamos felices por concentirte!</h3></p>';
            await enviarCorreo(correo,asunto,texto);
            await conexion.query(
            'UPDATE reservaciones SET nombre = ?,telefono = ?,correo = ?,servicio_id = ?,fecha = ?,hora = ? WHERE id = ?',
            [nombre,telefono,correo,servicio,fecha,hora,id]);
            return res.status(200).json({status:true,message:'Se ha modificado su cita, en breve le contactaremos'});
        }
        else{
            return res.status(400).json({status:false,errors:validacion});
        }
    }
    catch (error) {
        return res.status(500).json({status:false,errors:[error.message]});
    }
};

export const deleteReservaciones = async(req,res) => {
    try {
        const {id} = req.params;
        const [rows] = await conexion.query('SELECT r.*, s.nombre as servicio,date_format(fecha, "%d/%m/%Y") as cita,date_format(fecha, "%Y-%m-%d") as fecha2 FROM reservaciones r INNER JOIN servicios s ON r.servicio_id = s.id  WHERE r.id ="'+id+'" ');
        const [result] = await conexion.query('DELETE FROM reservaciones WHERE id = ?',[id]);
        if(result.affectedRows === 0){
            return res.status(404).json({status:'error',errors:[{id:'No existe el ID'}]});
        }
        const asunto = 'Cancelación de reservación en SPA Relaxín';
        const texto = '<h3>Estimado(a) <b>'+rows[0].nombre+'</b> </h3><p>Hemos cancelado tu reservación para del día <b>'+rows[0].cita+'</b> a las <b>'+rows[0].hora+'</b>   <p>Si crees que esto es un error, comunícate con nosotros</p> </p><p><h3>En SPA Relaxin ¡estamos felices por concentirte!</h3></p>';
        await enviarCorreo(rows[0].correo,asunto,texto);
        return res.status(200).json({status:true,message:'Reservación cancelada'});
    }
    catch (error) {
        return res.status(500).json({status:false,errors:[error.message]});
    }
};

export const enviarCorreo = async(correo,asunto,texto) =>{
    var message = {
        from: EMAIL_USER,
        to: correo,
        subject: asunto,
        text: '',
        html: texto
    };
    var transporter = nodemailer.createTransport({
        host:EMAIL_HOST,
        port:EMAIL_PORT,
        auth: {
            type:EMAIL_TYPE,
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });
    transporter.sendMail(message);
}

function validar(nombre,telefono,correo,servicio,fecha,hora){
    var errors =[];
    if(nombre === undefined || nombre.trim() === '' || nombre.lenght > 100){
        errors.push(
            'El nombre NO debe estar vacío y debe tener máximo 100 caracteres'
        );
    }
    if(telefono === undefined || telefono.trim() === '' || telefono.lenght > 15){
        errors.push(
            'El teléfono NO debe estar vacío y debe tener máximo 15 caracteres'
        );
    }
    if(correo === undefined || correo.trim() === '' || correo.lenght > 80){
        errors.push(
            'El correo NO debe estar vacío y debe tener máximo 80 caracteres'
        );
    }
    if(servicio === undefined || servicio.trim() === '' || isNaN(servicio)){
        errors.push(
            'El servicio NO debe estar vacío'
        );
    }
    if(fecha === undefined || fecha.trim() === '' || fecha.lenght > 10){
        errors.push(
            'La fecha NO debe estar vacía y debe tener máximo 10 caracteres'
        );
    }
    if(hora === undefined || hora.trim() === '' || hora.lenght > 10){
        errors.push(
            'La hora NO debe estar vacía'
        );
    }
    return errors;
}