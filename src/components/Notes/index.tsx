import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Notes.module.css";
import WindowBox from "../WindowBox/WindowBox";
import { notesData } from "../../assets/notesData";

interface NotesProps {
    onClickClose: () => void;
    setActiveElement: (element: string) => void;
    zIndexVal: number;
    activeElement: string;
}

const Notes: React.FC<NotesProps> = ({
    onClickClose,
    setActiveElement,
    zIndexVal,
    activeElement,
}) => {
    const [selectedSection, setSelectedSection] = useState<string | null>(null);
    const [selectedNote, setSelectedNote] = useState<string | null>(null);

    const sections = Object.keys(notesData);

    const getCurrentNotes = () => {
        if (!selectedSection) {
            return Object.values(notesData).flat();
        }
        return notesData[selectedSection] || [];
    };

    const currentNotes = getCurrentNotes();
    const currentNote = selectedNote
        ? currentNotes.find((note) => note.id === selectedNote)
        : null;

    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const noteRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (activeElement === "Notes" && sectionRefs.current[0]) {
            const timer = setTimeout(() => {
                sectionRefs.current[0]?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [activeElement]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && activeElement === "Notes") {
                if (selectedNote) {
                    setSelectedNote(null);
                } else {
                    onClickClose();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeElement, onClickClose, selectedNote]);

    const handleSectionKeyDown = useCallback(
        (event: React.KeyboardEvent, index: number) => {
            switch (event.key) {
                case "Enter":
                case " ":
                    event.preventDefault();
                    const sectionName =
                        index === 0 ? null : sections[index - 1];
                    setSelectedSection(sectionName);
                    setSelectedNote(null);
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    const nextIndex = Math.min(index + 1, sections.length);
                    sectionRefs.current[nextIndex]?.focus();
                    break;
                case "ArrowUp":
                    event.preventDefault();
                    const prevIndex = Math.max(index - 1, 0);
                    sectionRefs.current[prevIndex]?.focus();
                    break;
                case "ArrowRight":
                    event.preventDefault();
                    if (noteRefs.current[0]) {
                        noteRefs.current[0].focus();
                    }
                    break;
            }
        },
        [sections]
    );

    const handleNoteKeyDown = useCallback(
        (event: React.KeyboardEvent, index: number) => {
            switch (event.key) {
                case "Enter":
                case " ":
                    event.preventDefault();
                    const note = currentNotes[index];
                    setSelectedNote(note.id);
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    const nextIndex = Math.min(
                        index + 1,
                        currentNotes.length - 1
                    );
                    noteRefs.current[nextIndex]?.focus();
                    break;
                case "ArrowUp":
                    event.preventDefault();
                    const prevIndex = Math.max(index - 1, 0);
                    noteRefs.current[prevIndex]?.focus();
                    break;
                case "ArrowLeft":
                    event.preventDefault();
                    const targetSectionIndex = selectedSection
                        ? sections.indexOf(selectedSection) + 1
                        : 0;
                    sectionRefs.current[targetSectionIndex]?.focus();
                    break;
            }
        },
        [currentNotes, selectedSection, sections]
    );

    const handleSectionSelect = (sectionName: string | null) => {
        setSelectedSection(sectionName);
        setSelectedNote(null);
    };

    const handleNoteSelect = (noteId: string) => {
        setSelectedNote(noteId);
    };

    return (
        <WindowBox
            onClickClose={onClickClose}
            setActive={() => setActiveElement("Notes")}
            zIndexVal={zIndexVal}
            offset={30}
            displayText="Notes - Knowledge Base"
            activeElement={activeElement === "Notes"}
            displayTextMobile={"Notes"}
            initialWidth={85}
            initialHeight={85}
        >
            <div
                className={styles.notesContainer}
                role="main"
                aria-label="Notes application"
            >
                <div className={styles.desktopLayout}>
                    <div className={styles.sidebar} role="navigation" aria-label="Note categories">
                        <div className={styles.sidebarHeader}>
                            <h3 className={styles.sidebarTitle}>Folders</h3>
                        </div>
                        <div
                            className={styles.sectionList}
                            role="list"
                            aria-label="Note categories"
                        >
                            <div
                                ref={(el) => (sectionRefs.current[0] = el)}
                                className={`${styles.sectionItem} ${
                                    selectedSection === null
                                        ? styles.selected
                                        : ""
                                }`}
                                onClick={() => handleSectionSelect(null)}
                                onKeyDown={(e) => handleSectionKeyDown(e, 0)}
                                role="listitem"
                                tabIndex={0}
                                aria-selected={selectedSection === null}
                            >
                                <span
                                    className={styles.sectionIcon}
                                    aria-hidden="true"
                                >
                                    📚
                                </span>
                                <span className={styles.sectionName}>All</span>
                                <span className={styles.noteCount}>
                                    {Object.values(notesData).flat().length}
                                </span>
                            </div>

                            {sections.map((section, index) => (
                                <div
                                    key={section}
                                    ref={(el) =>
                                        (sectionRefs.current[index + 1] = el)
                                    }
                                    className={`${styles.sectionItem} ${
                                        selectedSection === section
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={() => handleSectionSelect(section)}
                                    onKeyDown={(e) =>
                                        handleSectionKeyDown(e, index + 1)
                                    }
                                    role="listitem"
                                    tabIndex={0}
                                    aria-selected={selectedSection === section}
                                >
                                    <span
                                        className={styles.sectionIcon}
                                        aria-hidden="true"
                                    >
                                        {section === "Dev"
                                            ? "💻"
                                            : section === "DSA"
                                            ? "🧮"
                                            : "🏆"}
                                    </span>
                                    <span className={styles.sectionName}>
                                        {section}
                                    </span>
                                    <span className={styles.noteCount}>
                                        {notesData[section]?.length || 0}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className={styles.notesList}
                        role="region"
                        aria-label="Notes list"
                    >
                        <div className={styles.notesHeader}>
                            <h3 className={styles.notesTitle}>
                                {selectedSection || "All Notes"}
                            </h3>
                            <span className={styles.notesCount}>
                                {currentNotes.length} note
                                {currentNotes.length !== 1 ? "s" : ""}
                            </span>
                        </div>
                        <div
                            className={styles.notesGrid}
                            role="list"
                            aria-label="Available notes"
                        >
                            {selectedSection === null
                                ? sections.map(
                                      (section) =>
                                          notesData[section] &&
                                          notesData[section].length > 0 && (
                                              <div
                                                  key={section}
                                                  className={
                                                      styles.sectionGroup
                                                  }
                                                  role="group"
                                                  aria-labelledby={`group-${section}`}
                                              >
                                                  <div
                                                      className={
                                                          styles.groupHeader
                                                      }
                                                  >
                                                      <h4
                                                          id={`group-${section}`}
                                                          className={
                                                              styles.groupTitle
                                                          }
                                                      >
                                                          {section}
                                                      </h4>
                                                  </div>
                                                  <div
                                                      className={
                                                          styles.groupNotes
                                                      }
                                                  >
                                                      {notesData[section].map(
                                                          (note, noteIndex) => {
                                                              const globalIndex =
                                                                  Object.values(
                                                                      notesData
                                                                  )
                                                                      .flat()
                                                                      .findIndex(
                                                                          (n) =>
                                                                              n.id ===
                                                                              note.id
                                                                      );
                                                              return (
                                                                  <div
                                                                      key={
                                                                          note.id
                                                                      }
                                                                      ref={(
                                                                          el
                                                                      ) =>
                                                                          (noteRefs.current[
                                                                              globalIndex
                                                                          ] =
                                                                              el)
                                                                      }
                                                                      className={`${
                                                                          styles.noteCard
                                                                      } ${
                                                                          selectedNote ===
                                                                          note.id
                                                                              ? styles.selectedNote
                                                                              : ""
                                                                      }`}
                                                                      onClick={() =>
                                                                          handleNoteSelect(
                                                                              note.id
                                                                          )
                                                                      }
                                                                      onKeyDown={(
                                                                          e
                                                                      ) =>
                                                                          handleNoteKeyDown(
                                                                              e,
                                                                              globalIndex
                                                                          )
                                                                      }
                                                                      role="listitem"
                                                                      tabIndex={
                                                                          0
                                                                      }
                                                                      aria-selected={
                                                                          selectedNote ===
                                                                          note.id
                                                                      }
                                                                  >
                                                                      <div
                                                                          className={
                                                                              styles.noteHeader
                                                                          }
                                                                      >
                                                                          <h4
                                                                              className={
                                                                                  styles.noteTitle
                                                                              }
                                                                          >
                                                                              {
                                                                                  note.title
                                                                              }
                                                                          </h4>
                                                                          {note.date && (
                                                                              <span
                                                                                  className={
                                                                                      styles.noteDate
                                                                                  }
                                                                              >
                                                                                  {
                                                                                      note.date
                                                                                  }
                                                                              </span>
                                                                          )}
                                                                      </div>
                                                                      <p
                                                                          className={
                                                                              styles.notePreview
                                                                          }
                                                                      >
                                                                          {
                                                                              note.preview
                                                                          }
                                                                      </p>
                                                                  </div>
                                                              );
                                                          }
                                                      )}
                                                  </div>
                                              </div>
                                          )
                                  )
                                : currentNotes.map((note, noteIndex) => (
                                      <div
                                          key={note.id}
                                          ref={(el) =>
                                              (noteRefs.current[noteIndex] = el)
                                          }
                                          className={`${styles.noteCard} ${
                                              selectedNote === note.id
                                                  ? styles.selectedNote
                                                  : ""
                                          }`}
                                          onClick={() =>
                                              handleNoteSelect(note.id)
                                          }
                                          onKeyDown={(e) =>
                                              handleNoteKeyDown(e, noteIndex)
                                          }
                                          role="listitem"
                                          tabIndex={0}
                                          aria-selected={
                                              selectedNote === note.id
                                          }
                                      >
                                          <div className={styles.noteHeader}>
                                              <h4 className={styles.noteTitle}>
                                                  {note.title}
                                              </h4>
                                              {note.date && (
                                                  <span
                                                      className={
                                                          styles.noteDate
                                                      }
                                                  >
                                                      {note.date}
                                                  </span>
                                              )}
                                          </div>
                                          <p className={styles.notePreview}>
                                              {note.preview}
                                          </p>
                                      </div>
                                  ))}
                        </div>
                    </div>

                    <div
                        className={styles.noteContent}
                        role="main"
                        aria-label="Note content"
                    >
                        {currentNote ? (
                            <>
                                <div className={styles.contentHeader}>
                                    <h2 className={styles.contentTitle}>
                                        {currentNote.title}
                                    </h2>
                                    <div className={styles.contentMeta}>
                                        {currentNote.date && (
                                            <span
                                                className={styles.contentDate}
                                            >
                                                {currentNote.date}
                                            </span>
                                        )}
                                        <span className={styles.contentSection}>
                                            {selectedSection}
                                        </span>
                                    </div>
                                </div>
                                {currentNote.image && (
                                    <div className={styles.contentImage}>
                                        <img
                                            src={currentNote.image}
                                            alt={`Visual content for ${currentNote.title}`}
                                        />
                                    </div>
                                )}
                                <div className={styles.contentBody}>
                                    {currentNote.content}
                                </div>
                            </>
                        ) : (
                            <div className={styles.emptyContent}>
                                <div
                                    className={styles.emptyIcon}
                                    aria-hidden="true"
                                >
                                    📝
                                </div>
                                <h3 className={styles.emptyTitle}>
                                    Select a note
                                </h3>
                                <p className={styles.emptyMessage}>
                                    Choose a note from the list to view its
                                    content
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div
                    className={styles.mobileLayout}
                    role="main"
                    aria-label="Mobile notes view"
                >
                    {!selectedNote ? (
                        <>
                            <div className={styles.mobileSectionSelector}>
                                <div
                                    className={`${styles.mobileSectionChip} ${
                                        selectedSection === null
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={() => handleSectionSelect(null)}
                                    role="tab"
                                    tabIndex={0}
                                    aria-selected={selectedSection === null}
                                >
                                    <span className={styles.chipText}>All</span>
                                    <span className={styles.chipCount}>
                                        {Object.values(notesData).flat().length}
                                    </span>
                                </div>

                                {sections.map((section) => (
                                    <div
                                        key={section}
                                        className={`${
                                            styles.mobileSectionChip
                                        } ${
                                            selectedSection === section
                                                ? styles.selected
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleSectionSelect(section)
                                        }
                                        role="tab"
                                        tabIndex={0}
                                        aria-selected={
                                            selectedSection === section
                                        }
                                    >
                                        <span className={styles.chipText}>
                                            {section}
                                        </span>
                                        <span className={styles.chipCount}>
                                            {notesData[section]?.length || 0}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.mobileNotesList}>
                                {currentNotes.map((note) => (
                                    <div
                                        key={note.id}
                                        className={styles.mobileNoteCard}
                                        onClick={() =>
                                            handleNoteSelect(note.id)
                                        }
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <div className={styles.noteHeader}>
                                            <h4 className={styles.noteTitle}>
                                                {note.title}
                                            </h4>
                                            {note.date && (
                                                <span
                                                    className={styles.noteDate}
                                                >
                                                    {note.date}
                                                </span>
                                            )}
                                        </div>
                                        <p className={styles.notePreview}>
                                            {note.preview}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className={styles.mobileNoteView}>
                            <div className={styles.mobileHeader}>
                                <button
                                    className={styles.backButton}
                                    onClick={() => setSelectedNote(null)}
                                    aria-label="Back to notes list"
                                >
                                    ← Back
                                </button>
                                <h2 className={styles.mobileTitle}>
                                    {currentNote?.title}
                                </h2>
                            </div>
                            <div className={styles.mobileContentSection}>
                                {currentNote?.image && (
                                    <div className={styles.contentImage}>
                                        <img
                                            src={currentNote.image}
                                            alt={`Visual content for ${currentNote.title}`}
                                        />
                                    </div>
                                )}
                                <div className={styles.contentBody}>
                                    {currentNote?.content}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </WindowBox>
    );
};

export default Notes;
