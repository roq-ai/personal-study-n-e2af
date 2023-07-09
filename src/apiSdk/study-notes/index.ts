import axios from 'axios';
import queryString from 'query-string';
import { StudyNoteInterface, StudyNoteGetQueryInterface } from 'interfaces/study-note';
import { GetQueryInterface } from '../../interfaces';

export const getStudyNotes = async (query?: StudyNoteGetQueryInterface) => {
  const response = await axios.get(`/api/study-notes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createStudyNote = async (studyNote: StudyNoteInterface) => {
  const response = await axios.post('/api/study-notes', studyNote);
  return response.data;
};

export const updateStudyNoteById = async (id: string, studyNote: StudyNoteInterface) => {
  const response = await axios.put(`/api/study-notes/${id}`, studyNote);
  return response.data;
};

export const getStudyNoteById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/study-notes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStudyNoteById = async (id: string) => {
  const response = await axios.delete(`/api/study-notes/${id}`);
  return response.data;
};
