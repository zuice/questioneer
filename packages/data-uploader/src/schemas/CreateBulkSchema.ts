import * as Yup from 'yup';

export const CreateBulkSchema = Yup.object()
  .shape({
    questions: Yup.array(
      Yup.object()
        .shape({
          body: Yup.string().required(),
          difficultyId: Yup.string().required(),
          topicId: Yup.string().required(),
          answers: Yup.array(
            Yup.object()
              .shape({
                body: Yup.string().required(),
              })
              .required(),
          ),
        })
        .required(),
    ),
  })
  .required();
