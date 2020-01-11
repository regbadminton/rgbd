const pathname=location.pathname;
const last=pathname.lastIndexOf('/');;

addEventListener('load',async()=>{
    let page=pathname.substring(last-1,last);
    let date='tomorrow'
    if(isNaN(page)){
        page=page.charCodeAt(0)-96;
        date='today';
    }

    document.body.style.backgroundColor='#3C7EB7';
    let courses=(await(await fetch('https://regbadminton.com/api/?d='+date)).json()).map(obj=>new Course(obj));
    if(page>courses.length)location='https://cityofsurrey.perfectmind.com/23615/Menu/BookMe4BookingPages/Classes?calendarId=ec6defcd-4317-4bf3-a72e-a9c6b4e5c897&widgetId=15f6af07-39c5-473e-b053-96653f77a406&embed=False';
    else location=courses[page-1].getURL();
})

class Course{
    constructor(obj){
        this.date=obj.date.split('-').reduce((combined,current)=>combined+=current);
        this.classID=obj.classID;
        this.locationID=obj.locationID;
    }
    getURL(){
        return `https://cityofsurrey.perfectmind.com/23615/Menu/BookMe4EventParticipants?eventId=${this.classID}&occurrenceDate=${this.date}&widgetId=15f6af07-39c5-473e-b053-96653f77a406&locationId=${this.locationID}&waitListMode=False`;
    }
}
