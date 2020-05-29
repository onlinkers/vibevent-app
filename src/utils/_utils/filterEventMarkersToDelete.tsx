import { Event } from "types/props";

/**
 * function filters out the markers that need to be deleted by combing through the list of events and spotting markers that represent events not in the list
 * the function also returns the remaining markers, and an array of event ids that already have markers representing them
 * @param markerObjects - object containing mapbox markers keyed by their corresponding event id
 * @param events - array of events
 */
export const filterEventMarkersToDelete =
    (markerObjects: { [key: string]: any }, events: Event[])
    : {markersToDelete: any[], markersLeft: { [key: string]: any }, eventIdsWithMarkers: string[]} | null => {

    // if no marker objects
    if(!Object.keys(markerObjects).length) return null;
    // initial "allsame" is determined if both lengths are same
    let allSame = Object.keys(markerObjects).length === events.length;

    const eventIdsWithMarkers:string[] = [];
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
            eventIdsWithMarkers.push(eventFound._id);
        }

        return markersList;
    }, [] as any);

    if(allSame) return null;
    else return { markersToDelete, markersLeft, eventIdsWithMarkers };

};