import { useState } from 'react';
import { Button } from "/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "/components/ui/card";
import { Input } from "/components/ui/input";
import { Label } from "/components/ui/label";
import { RadioGroup, RadioGroupItem } from "/components/ui/radio-group";
import { Minus, Check } from "lucide-react";

export default function ProfessionalProfilePage() {
  const [skills, setSkills] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [careerDemand, setCareerDemand] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleSkillInputBlur = () => {
    if (skillInput.trim()) {
      const newSkills = skillInput.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
      setSkills(newSkills);
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (skills.length > 0 && experienceLevel.trim() && careerDemand.trim()) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Career Recommendation System</CardTitle>
          <CardDescription>Enter your professional details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <CardTitle className="text-lg font-semibold mb-2">Skills</CardTitle>
              <Input
                type="text"
                placeholder="Enter skills separated by commas"
                value={skillInput}
                onChange={handleSkillInputChange}
                onBlur={handleSkillInputBlur}
                className="mb-2"
              />
              <div className="flex flex-wrap">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded mr-2 mb-2 flex items-center">
                    {skill}
                    <Button variant="ghost" onClick={() => removeSkill(index)} className="ml-2">
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <CardTitle className="text-lg font-semibold mb-2">Experience Level</CardTitle>
              <RadioGroup value={experienceLevel} onValueChange={setExperienceLevel}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Mid-Level to Senior" id="mid-level-to-senior" />
                  <Label htmlFor="mid-level-to-senior">Mid-Level to Senior</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Entry-Level to Mid" id="entry-level-to-mid" />
                  <Label htmlFor="entry-level-to-mid">Entry-Level to Mid</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Senior-Level" id="senior-level" />
                  <Label htmlFor="senior-level">Senior-Level</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-6">
              <CardTitle className="text-lg font-semibold mb-2">Career Demand</CardTitle>
              <RadioGroup value={careerDemand} onValueChange={setCareerDemand}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="High" id="high" />
                  <Label htmlFor="high">High</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit">
              <Check className="h-4 w-4 mr-2" />
              Submit
            </Button>
          </form>
        </CardContent>
        {formSubmitted && (
          <CardFooter>
            <p className="text-green-500">Profile submitted successfully!</p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
