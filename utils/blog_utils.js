import moment from "moment";

// Remove empty strings and trim
export const cleanTag = (tag) => tag?.trim().replace(/^"+|"+$/g, "");

// Remove empty strings and trim
export const cleanArray = (arr) =>
  arr
    .map((tag) => tag?.trim().replace(/^"+|"+$/g, ""))
    .filter((t) => t && t !== "");

// Count occurrences and sort by frequency
export const countAndSort = (arr) => {
  const countMap = {};
  arr.forEach((item) => {
    if (item) countMap[item] = (countMap[item] || 0) + 1;
  });
  return Object.entries(countMap)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key);
};

export const sortItems = (allItems = []) => {
  try {
    // Collect tags from seo.metaKeywords & seo.metaKeywords_ai
    let tagsArray = [];
    allItems.forEach((item) => {
      if (Array.isArray(item.seo?.metaKeywords)) {
        tagsArray.push(...item.seo.metaKeywords);
      }
      if (typeof item.seo?.metaKeywords_ai === "string") {
        const aiKeywords = item.seo.metaKeywords_ai
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t);
        tagsArray.push(...aiKeywords);
      }
    });
    const tags = countAndSort(tagsArray);

    // Collect additional tags from cate_tax?.tags (separate array)
    let addTagsArray = [];
    allItems.forEach((item) => {
      if (Array.isArray(item.cate_tax?.tags)) {
        const cleanedTags = item.cate_tax?.tags
          .map((t) => cleanTag(t))
          .filter((t) => t);
        addTagsArray.push(...cleanedTags);
      }
    });
    const add_tags = countAndSort(addTagsArray);

    // Collect schema from seo?.schemaType (array or comma-separated string)
    let schemaArray = [];
    allItems.forEach((item) => {
      if (Array.isArray(item.seo?.schemaType)) {
        schemaArray.push(...item.seo.schemaType);
      } else if (typeof item.seo?.schemaType === "string") {
        const schemas = item.seo.schemaType
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t);
        schemaArray.push(...schemas);
      }
    });
    const schema = countAndSort(schemaArray);

    // Build monthly date archives (YYYY-MM)
    const dateArchivesSet = new Set();
    allItems.forEach((item) => {
      const date = item.createdAt?.toDate?.() || new Date(item.createdAt);
      const key = moment(date).format("YYYY-MM");
      dateArchivesSet.add(key);
    });

    return {
      tags,
      add_tags,
      schema,
      date_archive: Array.from(dateArchivesSet).sort((a, b) =>
        b.localeCompare(a)
      ),
    };
  } catch (err) {
    console.log(err);
    return {
      err: err.message,
      tags: [],
      add_tags: [],
      schema: [],
      date_archive: [],
    };
  }
};

export const filterBlock = (items = [], category, search_query, date, tagz) => {
  const tags = tagz?.length > 0 ? tagz?.map((t) => t?.replace(/-/g, " ")) : [];

  return items.filter((item) => {
    // Category filter
    const categoryMatch = category
      ? item.category?.toLowerCase() === category.toLowerCase()
      : true;

    // Date filter (MMMM-YYYY)
    const dateMatch =
      date && date !== "all"
        ? moment(item.createdAt).format("MMMM-YYYY").toLowerCase() ===
          date.toLowerCase()
        : true;

    // Tags filter
    const itemTags = [
      ...(item.seo?.metaKeywords || []),
      ...(item.seo?.metaKeywords_ai || []),
      ...(item.cate_tax?.tags || []),
    ].map((t) => t.toLowerCase());

    const tagsMatch =
      tags?.length > 0
        ? tags.some((t) => itemTags.includes(t.toLowerCase()))
        : true;

    let searchMatch = true;
    if (search_query && search_query.trim() !== "") {
      const regex = new RegExp(
        search_query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      ); // escape regex special chars
      const searchableFields = [
        item.title,
        item.category,
        ...(item.seo?.metaKeywords || []),
        ...(item.seo?.metaKeywords_ai || []),
        ...(item.cate_tax?.tags || []),
      ];
      searchMatch = searchableFields.some((field) => regex.test(field || ""));
    }

    // AND logic: all active filters must match
    return categoryMatch && dateMatch && tagsMatch && searchMatch;
  });
};
