import { NextResponse } from "next/server";
import dbConnect from "../../../utils/dbConnection";
import Timer from "../../../models/Timer";

export async function GET(req,res){
    await dbConnect();
    try {
        const timers = await Timer.find({});
        if(timers && timers.length > 0) {
            return NextResponse.json({ success: true, message: `Timer list`, data: timers });
        }
        return NextResponse.json({ success: false, message: `No record found`, data: null }, {status: 400});
    } catch (error) {
        return NextResponse.json({ success: false, message: `No record found`, data: null }, {status: 400});
    }
}

export async function POST(req,res){
    await dbConnect();
    try {
        const {name, endTime} = await req.json();
        const startDateTime = new Date();
        const endDateTime = new Date(endTime);
        
        const startMillis =  startDateTime.getTime();
        const endMillis =  endDateTime.getTime();
        if((endMillis - startMillis) <= 0){
            return NextResponse.json({ success: false, message: `End date or time must be greater then current date or time`, data: null }, {status: 400});
        }

        const timerObject = {
            name: name,
            startDateTime: startDateTime,
            endDateTime: endDateTime
        }

        const timer = await Timer.create(timerObject);
        if(timer){
            return NextResponse.json({ success: true, message: `New record added successfully`, data: timer });
        }
        return NextResponse.json({ success: false, message: `Failed to process timer`, data: null }, {status: 400});
    } catch (error) {
        return NextResponse.json({ success: false, message: `Failed to process timer`, data: null }, {status: 400});
    }
}