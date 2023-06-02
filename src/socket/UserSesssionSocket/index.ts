import { JoinPlaceSessionRequestDTO, LeavePlaceSessionRequestDTO, PlaceSessionActionUpdateRequestDTO, PlaceSessionUpdateDTO, QuickSessionReviewRequestDTO } from '../../dto/session/sockets'
import { PlaceSessionActionDataPayload, PLACE_SESSION_ACTIONS_ENUM } from '../../models/session'
import { socket } from '../index'

export class UserSessionSocket {
    private userID: string
    private username: string
    private placeID: string
    private socket = socket

    constructor(properties: { userID: string, username: string, placeID: string }) {
        this.userID = properties.userID
        this.username = properties.username
        this.placeID = properties.placeID

        this.socket.connect()
    }

    /**
     * ==============================
     * ==== QUICK REVIEW METHODS ====
     * ==============================
     */
    async quickReview() {
        const quickReviewData: QuickSessionReviewRequestDTO = {
            placeID: this.placeID,
            userID: this.userID
        } 
        await this.socket.emit('quick-review-place-session', quickReviewData)
    }

    async onQuickReviewUpdate(callback: (payload: number) => void) {
        await this.socket.on('quick-review-place-session', callback)
    }


    /**
     * ==============================
     * ====== JOIN AND LEAVE ========
     * ==============================
     */
    async joinSession() {
        const joinSessionData: JoinPlaceSessionRequestDTO = {
            placeID: this.placeID,
            userID: this.userID,
            username: this.username,
            currentDateISO: new Date().toISOString()
        }
        await this.socket.emit('join-place-session', joinSessionData)
    }
    
    async leaveSession(sessionID: string) {
        const leaveSessionData: LeavePlaceSessionRequestDTO = {
            placeID: this.placeID,
            sessionID: sessionID,
            userID: this.userID,
            username: this.username
        }
        this.socket.emit('leave-place-session', leaveSessionData)
    }
    
    /**
     * =================================
     * ==== SESSION ACTIONS METHODS ====
     * =================================
    */
   async updateSesssion(payload: { actionType: PLACE_SESSION_ACTIONS_ENUM, sessionID: string, actionData: PlaceSessionActionDataPayload }) {
        const actionData: PlaceSessionActionUpdateRequestDTO = {
            userID: this.userID,
            placeID: this.placeID,
            sessionID: payload.sessionID,
            type: payload.actionType,
            data: payload.actionData,
            createdDateISO: new Date().toISOString(),
        }
        await this.socket.emit('place-session-action', actionData)
   }

    // This string payload it's actually a JSON stringified object
    // with the following structure:
    // PlaceSessionAction && User types
    onSessionUpdated(callback: (payload: string) => void) {
        this.socket.on('place-session-update', callback)
    }

    async onSessionMessage(callback: (payload: string) => void) {
        await this.socket.on('place-session-message', callback)
    }
}