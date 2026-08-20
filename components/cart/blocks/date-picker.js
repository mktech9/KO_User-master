import { Paper, Stack, Text, ThemeIcon } from "@mantine/core";
import { DateInput, DatePicker } from "@mantine/dates";
import moment from "moment/moment";
import { PiCheckCircle, PiCheckCircleDuotone } from "react-icons/pi";

const DatePickerForCart = ({ date, setDate, disableInput, reseller }) => {
  const today = moment().endOf("day").add("days", 5);

  return (
    <>
      {reseller ? (
        <>
          {" "}
          <Paper radius={"md"} p={20} bg={"#f4f4f4"}>
            <Stack gap={10}>
              <Text size="md" fw={700}>
                Note
              </Text>
              <Stack gap={0}>
                <Text fw={500} size="sm">
                  Our team is currently reviewing the details, and will revert
                  with shipping price accordingly. You can expect an update from
                  the concerned sales person.
                </Text>
                <Text mt={10} size="sm" fw={500}>
                  If you have any further questions or need additional
                  assistance, please do not hesitate to contact.
                </Text>
              </Stack>
            </Stack>
          </Paper>
        </>
      ) : (
        <>
          <Paper radius={"md"} p={20} bg={"#f4f4f4"}>
            <Stack gap={10}>
              <Text size="md" fw={700}>
                Delivery Date
              </Text>
              {!disableInput && (
                <DateInput
                  placeholder="Select a date"
                  value={date}
                  onChange={setDate}
                  excludeDate={(date) => {
                    let d = moment(date);
                    return !d.isAfter(today);
                  }}
                />
              )}
              {date && (
                <Stack mt={15} gap={0} align="center">
                  <Stack gap={10} align="center">
                    <ThemeIcon autoContrast variant="gradient" radius={"lg"}>
                      <PiCheckCircle size={"1.5rem"} />
                    </ThemeIcon>{" "}
                    <Text fw={500} size="sm">
                      You have selected
                    </Text>
                  </Stack>
                  <Text size="md" fw={600}>
                    {moment(date).format("dddd Do MMMM YYYY")}
                  </Text>
                  <Text mt={5} size="xs" ta={"center"} fw={500}>
                    To ensure your expected delivery date, your order must be
                    confirmed and the final visual uploaded prior to 5:00 pm on
                    <br />({moment().format("DD MMM YYYY")})
                  </Text>
                </Stack>
              )}
            </Stack>
          </Paper>
        </>
      )}
    </>
  );
};

export default DatePickerForCart;
