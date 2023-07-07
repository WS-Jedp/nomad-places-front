import { MINDSETS } from '../mindsets'
import { PlaceMultimedia, RecentActivity } from '../multimedia'
import { Place } from '../places'
import { PlaceState, PLACE_STATUS } from '../placeStatus'
import { User } from '../user'
 
 /**
   * Model PlaceSession
   * 
   */
 export type PlaceSession = {
    id: string
    createdDate: Date
    endDate: Date
    recentActivity: PlaceMultimedia[]
    placeID: string
    usersIDs: string[]
    actions: PlaceSessionActions[]
  }

  
  /**
   * Model PlaceSessionActions
   * 
   */
  export type PlaceSessionActions = {
    id: string
    createdDate: string
    payload: any
    type: PLACE_SESSION_ACTIONS_ENUM
    dayTimeSection: DAY_TIME_SECTION_ENUM
    placeSessionID: string
    userID: string
    username: string
  }

  export type PlaceSessionCachedDataDTO = {
    placeID: string;
    lastUpdate: Date;
    amountOfPeople: {
      amount: string,
      actions: PlaceSessionActions[]
    }[];
    bestMindsetTo: {
      mindset: MINDSETS,
      actions: PlaceSessionActions[]
    }[];
    placeStatus: {
      name: string,
      type: string,
      value: boolean,
      actions: PlaceSessionActions[]
    }[];
    lastActions: PlaceSessionActions[]
    lastRecentlyActivities: RecentActivity[]
    usersInSession: {username: string, email: string, id: string, profilePicture: string}[]
  }

  export type PlaceWithCachedSession = Place & {
    sessionCachedData: Omit<PlaceSessionCachedDataDTO, 'placeID'>
  }

  export enum DAY_TIME_SECTION_ENUM {
    EARLY_MORNING = 'EARLY_MORNING',
    BEFORE_SUNRISE = 'BEFORE_SUNRISE',
    SUNRISE = 'SUNRISE',
    MORNING = 'MORNING',
    MIDDAY = 'MIDDAY',
    AFTERNOON = 'AFTERNOON',
    NIGHT = 'NIGHT',
    LATE_NIGHT = 'LATE_NIGHT'
  };

  export enum PLACE_SESSION_ACTIONS_ENUM {
    MESSAGE = 'MESSAGE',
    UPDATE = 'UPDATE',
    RECENT_ACTIVITY = 'RECENT_ACTIVITY',
    JOIN = 'JOIN',
    LEAVE = 'LEAVE'
  };

  export enum UPDATE_ACTIONS {
    PLACE_AMOUNT_OF_PEOPLE = 'PLACE_AMOUNT_OF_PEOPLE',
    PLACE_MINDSET = 'PLACE_MINDSET',
    PLACE_STATUS = 'PLACE_STATUS',
    PLACE_RECENT_ACTIVITY = 'PLACE_RECENT_ACTIVITY',
}

export interface UpdateActionData {
  [UPDATE_ACTIONS.PLACE_AMOUNT_OF_PEOPLE]: [number, number],
  [UPDATE_ACTIONS.PLACE_MINDSET]: MINDSETS,
  [UPDATE_ACTIONS.PLACE_STATUS]: any,
  [UPDATE_ACTIONS.PLACE_RECENT_ACTIVITY]: null,
}



  export interface PlaceSessionActionDataPayload {
    [PLACE_SESSION_ACTIONS_ENUM.MESSAGE]: {
        data: string,
    }
    [PLACE_SESSION_ACTIONS_ENUM.RECENT_ACTIVITY]: {
        data: PlaceMultimedia,
    }
    [PLACE_SESSION_ACTIONS_ENUM.UPDATE]: {
      type: UPDATE_ACTIONS,
      data: {
        data: { amount: string, range: [number, number] } | MINDSETS | PlaceState
      }
    }
    [PLACE_SESSION_ACTIONS_ENUM.LEAVE]: {
      data: {
        username: string
      }
    }
    [PLACE_SESSION_ACTIONS_ENUM.JOIN]: {
      data: {
        username: string
      }
    }
}
