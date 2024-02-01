import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheckSquare,
  faSquare,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { submitCSMAnswer } from "../api/api";
import Confirmation from "./confirmation";
import Loading from "./loading";

interface QuestionAnswerPair {
  request?: any;
  question?: string;
  answer?: string;
  setCsmVisible?: any;
  suggestions?: any;
  setSelectedCategory?: any;
}

interface QAPairsState {
  qaPairs: QuestionAnswerPair[];
  suggestions: string;
}

const Csm: React.FC<QuestionAnswerPair> = ({
  request,
  setCsmVisible,
  setSelectedCategory = () => {},
}) => {
  const [currentPart, setCurrentPart] = useState(1);
  const [suggestion, setSuggestion] = useState("");
  const [isConfirmationShow, setIsConfirmationShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [qaPairs, setQAPairs] = useState<QuestionAnswerPair[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array(3).fill(null)
  );
  const [data, setData] = useState<QAPairsState>({
    qaPairs: [],
    suggestions: "",
  });

  const getQuestionType = (index: number): string => {
    if (index === 0) {
      return "CC1";
    } else if (index === 1) {
      return "CC2";
    } else if (index === 2) {
      return "CC3";
    } else if (index === 3) {
      return "SQD0";
    } else if (index === 4) {
      return "SQD1";
    } else if (index === 5) {
      return "SQD2";
    } else if (index === 6) {
      return "SQD3";
    } else if (index === 7) {
      return "SQD4";
    } else if (index === 8) {
      return "SQD5";
    } else if (index === 9) {
      return "SQD6";
    } else if (index === 10) {
      return "SQD7";
    } else if (index === 11) {
      return "SQD8";
    } else {
      return "null";
    }
  };

  const handleOptionSelection = (index: number, option: string) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = option;
    setSelectedOptions(newSelectedOptions);
    const question = getQuestionType(index);

    const newPair: QuestionAnswerPair = {
      request,
      question,
      answer: option,
    };
    setQAPairs((prevQAPairs) => [...prevQAPairs, newPair]);
  };

  useEffect(() => {
    if (qaPairs) {
      setData((prevState: any) => ({
        ...prevState,
        qaPairs: qaPairs,
      }));
    }
  }, [qaPairs]);

  useEffect(() => {
    if (suggestion) {
      setData((prevState: any) => ({ ...prevState, suggestions: suggestion }));
    }
  }, [suggestion]);

  const handleSubmit = () => {
    setIsLoading(true);
    submitCSMAnswer(data, setIsConfirmationShow, setIsLoading);
  };

  const handleRequestClose = () => {
    setIsConfirmationShow(false);
    setCsmVisible(false);
    setSelectedCategory("Ongoing Schedule");
  };

  const parts = [
    <View style={styles.part} key={1}>
      <View style={styles.part1}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>HELP US SERVE YOU BETTER!</Text>
        </View>
        <Text style={styles.part1Text}>
          This Client Satisfaction Measurement (CSM) tracks the customer
          experience of government offices. Your feedback on your recently
          concluded transaction will help this office provide a better service.
          Personal information shared will be kept confidential, and you always
          have the option not to answer this form.
        </Text>
      </View>
    </View>,
    <View style={styles.part} key={2}>
      <View style={styles.questionContainer}>
        <Text style={styles.partText}>
          INSTRUCTIONS: Check mark(✔) your answer to the Citizen’s Charter (CC)
          questions. The Citizen’s Charter is an official document that reflects
          the services of a government agency/office including its requirements,
          fees, and processing times among others.
        </Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          CC1 Which of the following best describes your awareness of a CC?
        </Text>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() =>
              handleOptionSelection(
                0,
                "I know what a CC is and I saw this office’s CC."
              )
            }
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[0] ===
                "I know what a CC is and I saw this office’s CC."
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>
              I know what a CC is and I saw this office’s CC.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() =>
              handleOptionSelection(
                0,
                "I know what a CC is but I did NOT see this office’s CC."
              )
            }
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[0] ===
                "I know what a CC is but I did NOT see this office’s CC."
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>
              I know what a CC is but I did NOT see this office’s CC.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() =>
              handleOptionSelection(
                0,
                "I learned of the CC only when I saw this office’s CC."
              )
            }
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[0] ===
                "I learned of the CC only when I saw this office’s CC."
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>
              I learned of the CC only when I saw this office’s CC.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() =>
              handleOptionSelection(
                0,
                "I do not know what a CC is and did not see one in this office."
              )
            }
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[0] ===
                "I do not know what a CC is and did not see one in this office."
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>
              I do not know what a CC is and did not see one in this office.
              (Answers ‘N/A’ on CC2 and CC3).
            </Text>
          </TouchableOpacity>
        </View>
        {/* ... Other choices for CC1 ... */}
      </View>
      {/* ... Other questions ... */}
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          CC2 If aware of CC (answered 1-3 in CC1), would you say that the CC of
          this office was...?
        </Text>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(1, "Easy to see")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[1] === "Easy to see" ? faCheckSquare : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Easy to see</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(1, "Somewhat easy to see")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[1] === "Somewhat easy to see"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Somewhat easy to see</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(1, "Difficult to see")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[1] === "Difficult to see"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Difficult to see</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(1, "Not visible at all")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[1] === "Not visible at all"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Not visible at all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(1, "N/A")}
          >
            <FontAwesomeIcon
              icon={selectedOptions[1] === "N/A" ? faCheckSquare : faSquare}
              color="#060E57"
            />
            <Text style={styles.choiceText}>N/A</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* ... Additional questions ... */}
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          CC3 If aware of CC (answered codes 1-3 in CC1), how much did the CC
          help you in your transaction?
        </Text>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(2, "Helped very much")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[2] === "Helped very much"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Helped very much</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(2, "Somewhat helped")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[2] === "Somewhat helped"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Somewhat helped</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(2, "Did not help")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[2] === "Did not help" ? faCheckSquare : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Did not help</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(2, "N/A")}
          >
            <FontAwesomeIcon
              icon={selectedOptions[2] === "N/A" ? faCheckSquare : faSquare}
              color="#060E57"
            />
            <Text style={styles.choiceText}>N/A</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* ... Additional questions ... */}
    </View>,
    <View style={styles.part} key={3}>
      <View style={styles.questionContainer}>
        <Text style={styles.partText}>
          INSTRUCTIONS: For Service Quality Dimensions (SQD) 0-8, please put a
          check mark(✔) on the box that best corresponds to your answer.
        </Text>
      </View>
      {/* Sample Question with Checkboxes */}
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          SQD0: I am satisfied with the service that availed.
        </Text>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(3, "Strongly Agree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[3] === "Strongly Agree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(3, "Agree")}
          >
            <FontAwesomeIcon
              icon={selectedOptions[3] === "Agree" ? faCheckSquare : faSquare}
              color="#060E57"
            />
            <Text style={styles.choiceText}>Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() =>
              handleOptionSelection(3, "Neither Agree no Disagree")
            }
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[3] === "Neither Agree no Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Neither Agree no Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(3, "Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[3] === "Disagree" ? faCheckSquare : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(3, "Strongly Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[3] === "Strongly Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(3, "Not Applicable")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[3] === "Not Applicable"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Not Applicable</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          SQD1: I spent reasonable amount of time on my transaction.
        </Text>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(4, "Strongly Agree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[4] === "Strongly Agree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(4, "Agree")}
          >
            <FontAwesomeIcon
              icon={selectedOptions[4] === "Agree" ? faCheckSquare : faSquare}
              color="#060E57"
            />
            <Text style={styles.choiceText}>Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() =>
              handleOptionSelection(4, "Neither Agree no Disagree")
            }
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[4] === "Neither Agree no Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Neither Agree no Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(4, "Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[4] === "Disagree" ? faCheckSquare : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(4, "Strongly Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[4] === "Strongly Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(4, "Not Applicable")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[4] === "Not Applicable"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Not Applicable</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          SQD2: The office followed the transaction’s requirements and steps
          based on the information provided.
        </Text>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(5, "Strongly Agree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[5] === "Strongly Agree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(5, "Agree")}
          >
            <FontAwesomeIcon
              icon={selectedOptions[5] === "Agree" ? faCheckSquare : faSquare}
              color="#060E57"
            />
            <Text style={styles.choiceText}>Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() =>
              handleOptionSelection(5, "Neither Agree no Disagree")
            }
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[5] === "Neither Agree no Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Neither Agree no Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(5, "Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[5] === "Disagree" ? faCheckSquare : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(5, "Strongly Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[5] === "Strongly Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(5, "Not Applicable")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[5] === "Not Applicable"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Not Applicable</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>,
    <View style={styles.part} key={4}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          SQD3: The steps (including payment) I needed to do for my transaction
          were easy and simple.
        </Text>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(6, "Strongly Agree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[6] === "Strongly Agree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(6, "Agree")}
          >
            <FontAwesomeIcon
              icon={selectedOptions[6] === "Agree" ? faCheckSquare : faSquare}
              color="#060E57"
            />
            <Text style={styles.choiceText}>Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() =>
              handleOptionSelection(6, "Neither Agree no Disagree")
            }
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[6] === "Neither Agree no Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Neither Agree no Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(6, "Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[6] === "Disagree" ? faCheckSquare : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(6, "Strongly Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[6] === "Strongly Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(6, "Not Applicable")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[6] === "Not Applicable"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Not Applicable</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          SQD4: I easily found information about my transaction from the office
          or its website.
        </Text>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(7, "Strongly Agree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[7] === "Strongly Agree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(7, "Agree")}
          >
            <FontAwesomeIcon
              icon={selectedOptions[7] === "Agree" ? faCheckSquare : faSquare}
              color="#060E57"
            />
            <Text style={styles.choiceText}>Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() =>
              handleOptionSelection(7, "Neither Agree no Disagree")
            }
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[7] === "Neither Agree no Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Neither Agree no Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(7, "Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[7] === "Disagree" ? faCheckSquare : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(7, "Strongly Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[7] === "Strongly Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(7, "Not Applicable")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[7] === "Not Applicable"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Not Applicable</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          SQD5: I paid a reasonable amount of fees for my transaction. (if
          service was free, choose Not Applicable).
        </Text>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(8, "Strongly Agree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[8] === "Strongly Agree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(8, "Agree")}
          >
            <FontAwesomeIcon
              icon={selectedOptions[8] === "Agree" ? faCheckSquare : faSquare}
              color="#060E57"
            />
            <Text style={styles.choiceText}>Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() =>
              handleOptionSelection(8, "Neither Agree no Disagree")
            }
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[8] === "Neither Agree no Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Neither Agree no Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(8, "Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[8] === "Disagree" ? faCheckSquare : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(8, "Strongly Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[8] === "Strongly Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(8, "Not Applicable")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[8] === "Not Applicable"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Not Applicable</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>,
    <View style={styles.part} key={5}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          SQD6: I feel the office was fair to everyone, or “walang palakasan”
          during my transaction.
        </Text>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(9, "Strongly Agree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[9] === "Strongly Agree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(9, "Agree")}
          >
            <FontAwesomeIcon
              icon={selectedOptions[9] === "Agree" ? faCheckSquare : faSquare}
              color="#060E57"
            />
            <Text style={styles.choiceText}>Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() =>
              handleOptionSelection(9, "Neither Agree no Disagree")
            }
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[9] === "Neither Agree no Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Neither Agree no Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(9, "Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[9] === "Disagree" ? faCheckSquare : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(9, "Strongly Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[9] === "Strongly Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(9, "Not Applicable")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[9] === "Not Applicable"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Not Applicable</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          SQD7: I was treated courteously by the staff and (if asked for help)
          the staff was helpful.
        </Text>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(10, "Strongly Agree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[10] === "Strongly Agree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(10, "Agree")}
          >
            <FontAwesomeIcon
              icon={selectedOptions[10] === "Agree" ? faCheckSquare : faSquare}
              color="#060E57"
            />
            <Text style={styles.choiceText}>Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() =>
              handleOptionSelection(10, "Neither Agree no Disagree")
            }
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[10] === "Neither Agree no Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Neither Agree no Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(10, "Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[10] === "Disagree" ? faCheckSquare : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(10, "Strongly Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[10] === "Strongly Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(10, "Not Applicable")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[10] === "Not Applicable"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Not Applicable</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          SQD8: I got what I needed from the government office, or (if denied)
          denial of the request was successfully explained to me.
        </Text>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(11, "Strongly Agree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[11] === "Strongly Agree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(11, "Agree")}
          >
            <FontAwesomeIcon
              icon={selectedOptions[11] === "Agree" ? faCheckSquare : faSquare}
              color="#060E57"
            />
            <Text style={styles.choiceText}>Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() =>
              handleOptionSelection(11, "Neither Agree no Disagree")
            }
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[11] === "Neither Agree no Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Neither Agree no Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(11, "Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[11] === "Disagree" ? faCheckSquare : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(11, "Strongly Disagree")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[11] === "Strongly Disagree"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Strongly Disagree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => handleOptionSelection(11, "Not Applicable")}
          >
            <FontAwesomeIcon
              icon={
                selectedOptions[11] === "Not Applicable"
                  ? faCheckSquare
                  : faSquare
              }
              color="#060E57"
            />
            <Text style={styles.choiceText}>Not Applicable</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>,
    <View style={styles.part} key={6}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          Suggestions on how we can further improve our services (optional):
        </Text>
        <TextInput
          style={styles.textArea1}
          placeholder="Type here..."
          multiline
          numberOfLines={4}
          value={suggestion}
          onChangeText={(newText) => setSuggestion(newText)}
        />
      </View>
    </View>,
  ];

  return (
    <>
      <Modal style={styles.modalContainer}>
        <View style={styles.modalContent}>{parts[currentPart - 1]}</View>
        <View style={[styles.modalFooter, { backgroundColor: "transparent" }]}>
          <View style={styles.arrowPlaceholder} />
          {currentPart > 1 ? (
            <TouchableOpacity
              onPress={() =>
                setCurrentPart((prevPart) => Math.max(prevPart - 1, 1))
              }
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                color="#060E57"
                size={24}
                style={{ marginRight: "75%" }}
              />
            </TouchableOpacity>
          ) : null}
          {currentPart < 6 ? (
            <TouchableOpacity
              onPress={() => {
                setCurrentPart((prevPart) => Math.min(prevPart + 1, 6));
              }}
            >
              <FontAwesomeIcon
                icon={faArrowRight}
                color={"#060E57"}
                size={24}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
      <Confirmation
        visible={isConfirmationShow}
        animationType="fade"
        transparent={true}
        header="Success!"
        content="Your response has been successfully submitted."
        footer="Thank you for cooperation."
        onRequestClose={handleRequestClose}
        showContent
        showHeader
        showFooter
      />
      <Loading
        animationType="fade"
        visible={isLoading}
        transparent={true}
        onRequestClose={handleRequestClose}
        content="Processing..."
        showContent
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 0,
    width: "80%", // Adjust as needed
    height: "80%", // Adjust as needed
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    padding: 10,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "black",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  modalContent: {
    borderRadius: 10,
    alignItems: "center",
  },
  part: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  partText: {
    marginTop: 10,
    fontSize: 12,
    color: "black",
    textAlign: "justify",
    width: "auto",
  },
  modalFooter: {
    padding: 10,
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    zIndex: 999,
  },
  modalText: {
    color: "black",
  },
  arrowPlaceholder: {
    width: "auto",
  },
  questionContainer: {
    justifyContent: "center",
  },
  question: {
    fontSize: 12,
    color: "black",
    textAlign: "justify",
    marginTop: 12,
    marginLeft: 10,
    marginRight: 10,
  },
  choicesContainer: {
    marginTop: 10,
    marginLeft: 20,
    width: 330,
  },
  choiceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  choiceText: {
    marginLeft: 10,
    fontSize: 12,
  },
  submit: {
    color: "#060E57",
    fontSize: 18,
  },
  textArea1: {
    borderWidth: 1,
    borderColor: "#060E57",
    textAlign: "auto",
    borderRadius: 8,
    padding: 10,
    height: 150,
    marginTop: 10,
  },
  textArea2: {
    borderWidth: 1,
    borderColor: "#060E57",
    textAlign: "auto",
    borderRadius: 8,
    padding: 10,
    height: 50,
    marginTop: 20,
  },
  part1: {
    marginTop: 170,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#060E57",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "auto",
    height: 800,
    marginTop: -10,
  },
  part1Text: {
    color: "black",
  },
});

export default Csm;
