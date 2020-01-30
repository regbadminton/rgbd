addEventListener('load', async()=>{

  const pathname = location.pathname;
  const last = pathname.lastIndexOf('/');
  let page = pathname.substring(last - 1,last);
  
  let date = isNaN(page) ? 'today' : 'tomorrow';
  page = date == 'today' ? page.charCodeAt(0) - 96 : page;

  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundImage = 'url(../bg.jpg)';

  const courses = await(await fetch('https://regbadminton.com/api/?d=' + date)).json();

  if (page > courses.length) location = 'https://cityofsurrey.perfectmind.com/23615/Menu/BookMe4BookingPages/Classes'+
                                          '?calendarId=ec6defcd-4317-4bf3-a72e-a9c6b4e5c897'+
                                          '&widgetId=15f6af07-39c5-473e-b053-96653f77a406'+
                                          '&embed=False';

  else location = `https://cityofsurrey.perfectmind.com/23615/Menu/BookMe4EventParticipants`+
                    `?eventId=${courses[page - 1].classID}`+
                    `&occurrenceDate=${courses[page - 1].date.replace(/-/g, '')}`+
                    `&widgetId=15f6af07-39c5-473e-b053-96653f77a406`+
                    `&locationId=${courses[page - 1].locationID}`+
                    `&waitListMode=False`;
});
