import { MINDSETS } from '../mindsets'
import { PlaceMultimedia, RecentActivity } from '../multimedia'
import { Place } from '../places'
import { PLACE_STATUS } from '../placeStatus'
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
  }

  
  /**
   * Model PlaceSessionActions
   * 
   */
  export type PlaceSessionActions = {
    id: string
    createdDate: Date
    payload: any
    type: PLACE_SESSION_ACTIONS_ENUM
    dayTimeSection: DAY_TIME_SECTION_ENUM
    placeSessionID: string
    userID: string
  }

  export type PlaceSessionCachedDataDTO = {
    placeID: string;
    lastUpdate: Date;
    amountOfPeople: number;
    bestMindsetTo: MINDSETS;
    placeStatus: PLACE_STATUS;
    lastActions: PlaceSessionActions[]
    lastRecentlyActivities: RecentActivity[]
    usersInSession: User[]
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
    AMOUNT_OF_PEOPLE = 'AMOUNT_OF_PEOPLE',
    MINDSET_TO = "MINDSET_TO",
}


  export interface PlaceSessionActionDataPayload {
    [PLACE_SESSION_ACTIONS_ENUM.MESSAGE]: {
        data: string,
    }
    [PLACE_SESSION_ACTIONS_ENUM.RECENT_ACTIVITY]: {
        data: PlaceMultimedia,
    }
    [PLACE_SESSION_ACTIONS_ENUM.UPDATE]: {
        data: {
            type: UPDATE_ACTIONS,
            value: number | MINDSETS
        },
    }
    [PLACE_SESSION_ACTIONS_ENUM.LEAVE]: null
    [PLACE_SESSION_ACTIONS_ENUM.JOIN]: null
}
