import {
  OpinionCategory,
  OpinionStatus,
} from '@app/graphql/__generated__/graphql';

export const convertOpinionCategory = (category: OpinionCategory) => {
  switch (category) {
    case OpinionCategory.Imporve:
      return '개선';
    case OpinionCategory.Inquiry:
      return '문의';
    case OpinionCategory.Bug:
      return '버그';
    case OpinionCategory.Etc:
      return '기타';
    default:
      return '';
  }
};

export const convertOpinionStatus = (status: OpinionStatus) => {
  switch (status) {
    case OpinionStatus.Waiting:
      return '대기 중';
    case OpinionStatus.Read:
      return '확인 중';
    case OpinionStatus.Answered:
      return '답변 완료';
    default:
      return '';
  }
};
