import React, { cloneElement } from "react";
import {
  List,
  Datagrid,
  TextField,
  TopToolbar,
  CreateButton,
  ExportButton,
  Button,
  sanitizeListRestProps,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  choices,
  required,
  SelectInput,
} from "react-admin";
import IconEvent from "@material-ui/icons/Event";
import RichTextInput from "ra-input-rich-text";

const AdsActions = ({
  currentSort,
  className,
  resource,
  filters,
  displayedFilters,
  exporter, // you can hide ExportButton if exporter = (null || false)
  filterValues,
  permanentFilter,
  hasCreate, // you can hide CreateButton if hasCreate = false
  basePath,
  selectedIds,
  onUnselectItems,
  showFilter,
  maxResults,
  total,
  ...rest
}) => (
  <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
    {filters &&
      cloneElement(filters, {
        resource,
        showFilter,
        displayedFilters,
        filterValues,
        context: "button",
      })}
    <CreateButton basePath={basePath} />
    <ExportButton
      disabled={total === 0}
      resource={resource}
      sort={currentSort}
      filter={{ ...filterValues, ...permanentFilter }}
      exporter={exporter}
      maxResults={maxResults}
    />
    {/* Add your custom actions */}
    <Button
      onClick={() => {
        alert("Your custom action");
      }}
      label="Show calendar"
    >
      <IconEvent />
    </Button>
  </TopToolbar>
);

AdsActions.defaultProps = {
  selectedIds: [],
  onUnselectItems: () => null,
};

export const AdsList = (props) => (
  <List {...props} title="List of Ads" actions={<AdsActions />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="price" />
      <TextField source="title" />
      <TextField source="description" />
      <TextField source="adstatus" />
      <TextField source="condition" />
      <TextField source="pricenegotiable" />
    </Datagrid>
  </List>
);

const validateAdStatus = choices(["approved", "unapproved"], "Must select one");
const validateNegotaition = choices(["yes", "no"], "Must select one");

export const AdsCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" validate={required()} />
      <SelectInput
        label="Ad Status"
        source="adstatus"
        choices={[
          { id: "approved", name: "Approved" },
          { id: "unapproved", name: "Unapproved" },
        ]}
        validate={validateAdStatus}
      />
      <SelectInput
        label="Price Negotaible"
        source="pricenegotiable"
        choices={[
          { id: "yes", name: "Yes" },
          { id: "no", name: "No" },
        ]}
        validate={validateNegotaition}
      />
      <RichTextInput source="description" validate={required()} />
      <TextInput source="price" validate={required()} />
      <TextInput source="condition" validate={required()} />
    </SimpleForm>
  </Create>
);
