class Event {

    id: number;
    locationId: number;
    showId: number;
    trainerId?: number;
    variationId?: number;
    contractorId: number;
    note: string;

    constructor(id: number, locationId: number, showId: number, contractorId: number, note: string) {
        this.id = id;
        this.locationId = locationId;
        this.showId = showId;
        this.contractorId = contractorId;
        this.note = note;
    }

}

export default Event;