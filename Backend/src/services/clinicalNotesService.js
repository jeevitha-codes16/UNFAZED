const VISIBILITY_OPTIONS = ["private", "shared"];

// Validate clinical note details
const validateClinicalNote = ({ title, content, visibility }) => {
  if (typeof title !== "string" || !title.trim()) {
    throw new Error("Clinical note title is required.");
  }

  if (typeof content !== "string" || !content.trim()) {
    throw new Error("Clinical note content is required.");
  }

  if (!VISIBILITY_OPTIONS.includes(visibility)) {
    throw new Error("Visibility must be private or shared.");
  }

  return {
    title: title.trim(),
    content: content.trim(),
    visibility,
  };
};

// Determine whether a user can view a clinical note
const canViewClinicalNote = ({
  note,
  requesterId,
  requesterRole,
}) => {
  if (!note || !requesterId || !requesterRole) {
    return false;
  }

  // Only the note's owning therapist can view it by default
  if (
    requesterRole === "therapist" &&
    String(note.therapist) === String(requesterId)
  ) {
    return true;
  }

  // Clients can view notes explicitly shared with them
  if (
    requesterRole === "client" &&
    note.visibility === "shared" &&
    String(note.client) === String(requesterId)
  ) {
    return true;
  }

  return false;
};

// Remove confidential fields before returning a shared note
const formatNoteForClient = (note) => {
  if (!note || note.visibility !== "shared") {
    throw new Error("This note is not available for client sharing.");
  }

  return {
    title: note.title,
    content: note.content,
    visibility: note.visibility,
    createdAt: note.createdAt,
  };
};

module.exports = {
  VISIBILITY_OPTIONS,
  validateClinicalNote,
  canViewClinicalNote,
  formatNoteForClient,
};