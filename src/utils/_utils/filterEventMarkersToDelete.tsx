import { Event } from "types/props";

export const filterEventMarkersToDelete =
    (markerObjects: { [key: string]: any }, events: Event[])
    : {markersToDelete: any[], markersLeft: { [key: string]: any }, eventIdsToIgnore: string[]} | null => {

    // if no marker objects
    if(!Object.keys(markerObjects).length) return null;
    // initial "allsame" is determined if both lengths are same
    let allSame = Object.keys(markerObjects).length === events.length;

    const eventIdsToIgnore:string[] = [];
    const markersLeft:{ [key: string]: any } = {};

    const markersToDelete = Object.entries(markerObjects).reduce((markersList, [markerId, marker]) => {
        // add to delete list if the marker isnt't related to one of the events
        const eventFound = events.find((event) => event._id === markerId);
        if(!eventFound) {
            markersList.push(marker);
            allSame = false; // mark that they are not all the same
        }
        // add to events blacklist if the marker is related to one of the events 
        else {
            markersLeft[markerId] = marker;
            eventIdsToIgnore.push(eventFound._id);
        }

        return markersList;
    }, [] as any);

    // console.log("done", { markersToDelete }, { eventIdsToIgnore }, { allSame });

    if(allSame) return null;
    else return { markersToDelete, markersLeft, eventIdsToIgnore };

};