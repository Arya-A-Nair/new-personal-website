import React, { useState, useEffect } from "react";
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
    const [selectedSection, setSelectedSection] = useState<string | null>(null); // null means "All"
    const [selectedNote, setSelectedNote] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (activeElement !== "Notes") return;

            switch (event.key) {
                case "Escape":
                    event.preventDefault();
                    onClickClose();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeElement, onClickClose]);

    const sections = Object.keys(notesData);

    // Get notes based on selection
    const getCurrentNotes = () => {
        if (!selectedSection) {
            // Show all notes when no section is selected
            return Object.values(notesData).flat();
        }
        return notesData[selectedSection] || [];
    };

    const currentNotes = getCurrentNotes();
    const currentNote = selectedNote
        ? currentNotes.find((note) => note.id === selectedNote)
        : null;

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
            <div className={styles.notesContainer}>
                <div className={styles.desktopLayout}>
                    <div className={styles.sidebar}>
                        <div className={styles.sidebarHeader}>
                            <h3 className={styles.sidebarTitle}>Folders</h3>
                        </div>
                        <div className={styles.sectionList}>
                            {/* All sections option */}
                            <div
                                className={`${styles.sectionItem} ${
                                    selectedSection === null
                                        ? styles.selected
                                        : ""
                                }`}
                                onClick={() => {
                                    setSelectedSection(null);
                                    setSelectedNote(null);
                                }}
                            >
                                <span className={styles.sectionIcon}>📚</span>
                                <span className={styles.sectionName}>All</span>
                                <span className={styles.noteCount}>
                                    {Object.values(notesData).flat().length}
                                </span>
                            </div>

                            {sections.map((section) => (
                                <div
                                    key={section}
                                    className={`${styles.sectionItem} ${
                                        selectedSection === section
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={() => {
                                        setSelectedSection(section);
                                        setSelectedNote(null);
                                    }}
                                >
                                    <span className={styles.sectionIcon}>
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

                    {}
                    <div className={styles.notesList}>
                        <div className={styles.notesHeader}>
                            <h3 className={styles.notesTitle}>
                                {selectedSection || "All Notes"}
                            </h3>
                            <span className={styles.notesCount}>
                                {currentNotes.length} note
                                {currentNotes.length !== 1 ? "s" : ""}
                            </span>
                        </div>
                        <div className={styles.notesGrid}>
                            {selectedSection === null
                                ? // Grouped view for "All" - consistent UI for all sections
                                  sections.map(
                                      (section) =>
                                          notesData[section] &&
                                          notesData[section].length > 0 && (
                                              <div
                                                  key={section}
                                                  className={
                                                      styles.sectionGroup
                                                  }
                                              >
                                                  <div
                                                      className={
                                                          styles.groupHeader
                                                      }
                                                  >
                                                      <h4
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
                                                          (note) => (
                                                              <div
                                                                  key={note.id}
                                                                  className={`${
                                                                      styles.noteCard
                                                                  } ${
                                                                      selectedNote ===
                                                                      note.id
                                                                          ? styles.selectedNote
                                                                          : ""
                                                                  }`}
                                                                  onClick={() =>
                                                                      setSelectedNote(
                                                                          note.id
                                                                      )
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
                                                          )
                                                      )}
                                                  </div>
                                              </div>
                                          )
                                  )
                                : // Regular view for specific section
                                  currentNotes.map((note) => (
                                      <div
                                          key={note.id}
                                          className={`${styles.noteCard} ${
                                              selectedNote === note.id
                                                  ? styles.selectedNote
                                                  : ""
                                          }`}
                                          onClick={() =>
                                              setSelectedNote(note.id)
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

                    {}
                    <div className={styles.noteContent}>
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
                                            alt={currentNote.title}
                                        />
                                    </div>
                                )}
                                <div className={styles.contentBody}>
                                    {currentNote.content}
                                </div>
                            </>
                        ) : (
                            <div className={styles.emptyContent}>
                                <div className={styles.emptyIcon}>📝</div>
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

                {}
                <div className={styles.mobileLayout}>
                    {!selectedNote ? (
                        <>
                            <div className={styles.mobileHeader}>
                                <h1 className={styles.mobileTitle}>Notes</h1>
                                <p className={styles.mobileSubtitle}>
                                    Knowledge Base
                                </p>
                            </div>

                            <div className={styles.mobileSectionSelector}>
                                <div
                                    className={`${styles.mobileSectionChip} ${
                                        selectedSection === null
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={() => setSelectedSection(null)}
                                >
                                    <span className={styles.chipIcon}>📚</span>
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
                                            setSelectedSection(section)
                                        }
                                    >
                                        <span className={styles.chipIcon}>
                                            {section === "Dev"
                                                ? "💻"
                                                : section === "DSA"
                                                ? "🧮"
                                                : "🏆"}
                                        </span>
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
                                {selectedSection === null
                                    ? 
                                      sections.map(
                                          (section) =>
                                              notesData[section] &&
                                              notesData[section].length > 0 && (
                                                  <div
                                                      key={section}
                                                      className={
                                                          styles.mobileSectionGroup
                                                      }
                                                  >
                                                      <div
                                                          className={
                                                              styles.mobileGroupHeader
                                                          }
                                                      >
                                                          <h4
                                                              className={
                                                                  styles.mobileGroupTitle
                                                              }
                                                          >
                                                              {section}
                                                          </h4>
                                                      </div>
                                                      <div
                                                          className={
                                                              styles.mobileGroupNotes
                                                          }
                                                      >
                                                          {notesData[
                                                              section
                                                          ].map((note) => (
                                                              <div
                                                                  key={note.id}
                                                                  className={
                                                                      styles.mobileNoteCard
                                                                  }
                                                                  onClick={() =>
                                                                      setSelectedNote(
                                                                          note.id
                                                                      )
                                                                  }
                                                              >
                                                                  <div
                                                                      className={
                                                                          styles.mobileNoteHeader
                                                                      }
                                                                  >
                                                                      <h3
                                                                          className={
                                                                              styles.mobileNoteTitle
                                                                          }
                                                                      >
                                                                          {
                                                                              note.title
                                                                          }
                                                                      </h3>
                                                                      {note.date && (
                                                                          <span
                                                                              className={
                                                                                  styles.mobileNoteDate
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
                                                                          styles.mobileNotePreview
                                                                      }
                                                                  >
                                                                      {
                                                                          note.preview
                                                                      }
                                                                  </p>
                                                              </div>
                                                          ))}
                                                      </div>
                                                  </div>
                                              )
                                      )
                                    : 
                                      currentNotes.map((note) => (
                                          <div
                                              key={note.id}
                                              className={styles.mobileNoteCard}
                                              onClick={() =>
                                                  setSelectedNote(note.id)
                                              }
                                          >
                                              <div
                                                  className={
                                                      styles.mobileNoteHeader
                                                  }
                                              >
                                                  <h3
                                                      className={
                                                          styles.mobileNoteTitle
                                                      }
                                                  >
                                                      {note.title}
                                                  </h3>
                                                  {note.date && (
                                                      <span
                                                          className={
                                                              styles.mobileNoteDate
                                                          }
                                                      >
                                                          {note.date}
                                                      </span>
                                                  )}
                                              </div>
                                              <p
                                                  className={
                                                      styles.mobileNotePreview
                                                  }
                                              >
                                                  {note.preview}
                                              </p>
                                          </div>
                                      ))}
                            </div>
                        </>
                    ) : (
                        <div className={styles.mobileNoteView}>
                            <div
                                className={styles.mobileBackButton}
                                onClick={() => setSelectedNote(null)}
                            >
                                <span className={styles.backArrow}>←</span>
                                <span className={styles.backText}>Back</span>
                            </div>

                            {currentNote && (
                                <>
                                    <div className={styles.mobileContentHeader}>
                                        <h2
                                            className={
                                                styles.mobileContentTitle
                                            }
                                        >
                                            {currentNote.title}
                                        </h2>
                                        <div
                                            className={styles.mobileContentMeta}
                                        >
                                            {currentNote.date && (
                                                <span
                                                    className={
                                                        styles.mobileContentDate
                                                    }
                                                >
                                                    {currentNote.date}
                                                </span>
                                            )}
                                            <span
                                                className={
                                                    styles.mobileContentSection
                                                }
                                            >
                                                {selectedSection}
                                            </span>
                                        </div>
                                    </div>

                                    {currentNote.image && (
                                        <div
                                            className={
                                                styles.mobileContentImage
                                            }
                                        >
                                            <img
                                                src={currentNote.image}
                                                alt={currentNote.title}
                                            />
                                        </div>
                                    )}

                                    <div className={styles.mobileContentBody}>
                                        {currentNote.content}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </WindowBox>
    );
};

export default Notes;
