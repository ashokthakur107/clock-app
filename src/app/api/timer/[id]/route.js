import { NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnection";
import Timer from "../../../../models/Timer";

export async function GET(request,{params}){
    await dbConnect();
    try {
        const {id} = params;
        const timer = await Timer.findById(id);

        if(timer.activeDuration <= 0){
            const startTime = new Date(timer.startDateTime).getTime();
            const endTime = new Date(timer.endDateTime).getTime();
            const timeDifference = endTime - startTime;
            const activeDuration = Math.floor(timeDifference / 1000);

            await Timer.updateOne({_id: id}, {
                $set: {activeDuration: activeDuration}
            });
        }

        const timers = await Timer.findById(id);
        return NextResponse.json({ success: true, message: `Timer list`, data: timers });
    } catch (error) {
        console.log("error", error)
        return NextResponse.json({ success: false, message: `Something went wrong`, data: null }, {status: 400});
    }
}