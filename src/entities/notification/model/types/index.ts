export type NotificationType = 'MEDIA_SAVED' 
| 'WORK_CREATED' 
| 'CONTEST_CREATED' 
| 'CONTEST_COMMENT_ADDED' 
| 'WORK_COMMENT_ADDED' 
| 'COMMENT_COMMENT_ADDED' 
| 'COMMENT_COMMENT_ADDED' 
| 'COMMENT_LIKED' 
| 'WORK_LIKED' 
| 'USER_WON_CONTEST' 
| 'BALANCE_PLUS' 
| 'BALANCE_MINUS'
 
export interface Notification {
    id: string,
    type: NotificationType,
    content: string,
    read: boolean,
    createdAt: string
}