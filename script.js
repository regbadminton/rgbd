addEventListener('load',async()=>{
    const DATE_FORMAT={year:'numeric',month:'2-digit',day:'2-digit'};
    const date=new Date();
    const loc=location.pathname;
    const last=loc.lastIndexOf('/');
    let page=loc.substring(last-1,last);

    if(isNaN(page))page=page.charCodeAt(0)-96;
    else date.setDate(date.getDate()+1);
    page=parseInt(page);
    const strDate=date.toLocaleString('ja-JP',DATE_FORMAT).split('/').reduce((holder,value)=>holder+=value);

    courses=(await(await fetch('https://regbadminton.com/api/?d='+strDate)).json()).map(obj=>new Course(obj));
    if(page>courses.length)location='https://cityofsurrey.perfectmind.com/23615/Menu/BookMe4BookingPages/Classes?calendarId=ec6defcd-4317-4bf3-a72e-a9c6b4e5c897&widgetId=15f6af07-39c5-473e-b053-96653f77a406&embed=False';
    else location=courses[page-1].getURL();
})

class Course{
    constructor(obj){
        this.date=obj.date.split('-').reduce((holder,value)=>holder+=value);
        this.classID=obj.classID;
        this.locationID=obj.locationID;
    }
    getURL(){
        return `https://cityofsurrey.perfectmind.com/23615/Menu/BookMe4EventParticipants?eventId=${this.classID}&occurrenceDate=${this.date}&widgetId=15f6af07-39c5-473e-b053-96653f77a406&locationId=${this.locationID}&waitListMode=False`;
    }
}
