export {default as RippleView} from './hooks/click/rippleView';
export {default as useRipple} from './hooks/click/useRipple';

export type {LmgProps} from './images/loadingImg';
export {default as Lmg} from './images/loadingImg';


export {default as StarRate} from './star/star';
export type {starRateParams} from './star/star';

export type {MaskLoadingAttr} from './loading/mask/fullMaskLoading';
export {default as MaskLoading} from './loading/mask/fullMaskLoading';

export type {SkeletonAttr} from './loading/skeleton/skeleton';
export {default as Skeleton} from './loading/skeleton/skeleton';

export type {SpinAttr} from './loading/spin/spin';
export {default as Spin} from './loading/spin/spin';

export type {HorizontalTabAttr, TabItem} from './tabs/horizontally';
export {default as HorizontallyTabs} from './tabs/horizontally';

export type {HeaderAttr} from './header/index';
export {default as Header} from './header/index';

export type {SimpleTitleAttr} from './font/title';
export {default as SimpleTitle} from './font/title';

export type {EmojiAttr} from './emoji/emoji';
export type {EmojiItem} from './emoji/emojiList';
export {default as EmojiView} from './emoji/emoji';

export type {ToggleAttr, ToggleItem} from './data/toggle/index';
export {default as Toggle, defaultToggleItems} from './data/toggle/index';

export type {BtnAttr} from './btn/normal/btn';
export {default as Btn} from './btn/normal/btn';

export type {FabBtnAttr} from './btn/float/floatAddBtn';
export {default as FloatBtn} from './btn/float/floatAddBtn';

export type {IconAttr} from './icon/index';
export {default as Icons, ChangeIconUrl, AddIconUrl} from './icon/index';

export {default as InputAreaView} from './input/textarea/inputArea';
export type {inputAreaRef, inputAreaParams} from './input/textarea/inputArea';

export {default as UserSimpleView} from './user/simple';
export type {userSimpleViewParams} from './user/simple';

export {default as UserCommentInput} from './input/combined/userComment';
export type {
  userCommentInputParams,
  fileUploadResp,
  commentInputResult,
  inputLinkParams,
} from './input/combined/userComment';

export {default as InlineReplyInput} from './input/inlineReply/inlineReply';
export type {
  inlineReplyInputParams,
  inlineReplyInputResult,
} from './input/inlineReply/inlineReply';

export {default as ImgListAutoRender} from './images/autoRender/imgListAutoRender';
export type {ImgListAutoRenderParams} from './images/autoRender/imgListAutoRender';

export {default as CommentView} from './comment/view/normal';
export type {
  commentViewParams,
  commentViewBaseParams,
  commentUserParams,
} from './comment/view/normal';

export {default as CommentPreCombView} from './comment/view/normal/preComb';
export type {commentPreCombUserParams, commentPreCombParams} from './comment/view/normal/preComb';

export {default as AutoCardAlignGridView} from './cards/index';
export type {autoCardItem, autoCardAlignGridViewParams} from './cards/index';

export {default as CommentReplyView} from './comment/view/reply';
export type {commentReplyParams, commentReplyUserParams} from './comment/view/reply';

// 显示或编辑
export {default as ShowAndEditInput} from "./data/showAndEdit/input/index"
export type {showAndEditBase, showAndEditInputParams} from "./data/showAndEdit/input/index"


export {loadInitStyle} from "./tools/loadInitStyle"
