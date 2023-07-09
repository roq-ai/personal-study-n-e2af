import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { studyNoteValidationSchema } from 'validationSchema/study-notes';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getStudyNotes();
    case 'POST':
      return createStudyNote();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStudyNotes() {
    const data = await prisma.study_note
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'study_note'));
    return res.status(200).json(data);
  }

  async function createStudyNote() {
    await studyNoteValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.study_note.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
