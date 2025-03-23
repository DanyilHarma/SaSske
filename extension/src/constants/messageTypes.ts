export enum MessageType {
    /** Get the currently active site's domain */
    GET_ACTIVE_SITE = "GET_ACTIVE_SITE",

    /** Get global tracker paused state */
    GET_TRACKER_STATE = "GET_TRACKER_STATE",

    /** Get list of paused sites */
    GET_PAUSED_SITES = "GET_PAUSED_SITES",

    /** Pause or unpause tracking for a specific site */
    PAUSE_SITE = "PAUSE_SITE",

    /** Pause or unpause global tracker */
    PAUSE_TRACKER = "PAUSE_TRACKER",

    /** Save spent time for a specific site */
    SAVE_TIME = "SAVE_TIME",

    /** Notify content script about updated active site */
    UPDATE_SITE = "UPDATE_SITE",

    /** Notify tabs about global tracker pause state */
    TRACKER_PAUSED = "TRACKER_PAUSED",

    /** Notify tabs about site-specific tracking state */
    SITE_TRACKING_UPDATED = "SITE_TRACKING_UPDATED",
}
