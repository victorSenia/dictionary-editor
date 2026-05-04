import type { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import type { DictionaryConfig } from "../models/dictionary";

type CourseHeaderProps = {
  config: DictionaryConfig;
  setConfig: Dispatch<SetStateAction<DictionaryConfig>>;
};

export default function CourseHeader({ config, setConfig }: CourseHeaderProps) {
  const { t } = useTranslation();

  return (
    <section className="course-header-bar" aria-label={t("courseHeader.aria")}>
      <label className="course-name-field">
        <span>{t("courseHeader.courseName")}</span>
        <input
          type="text"
          value={config.rootTopic}
          onChange={(event) => setConfig((prev) => ({ ...prev, rootTopic: event.target.value }))}
        />
      </label>
    </section>
  );
}
